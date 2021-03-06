defmodule TracyWeb.ModuleServer do
  @moduledoc """
  Collects the lists of loaded modules from all connected nodes, for
  autocompletion purposes.
  """

  use GenServer

  # Client API
  def start_link() do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def all_modules do
    GenServer.call(__MODULE__, :all_modules)
  end

  def filter(pattern) do
    GenServer.call(__MODULE__, {:filter, pattern})
  end

  @timeout 5000

  defmodule State do
    defstruct by_node: %{}, flat: []
  end

  # Server callbacks
  def init(_) do
    {:ok, %State{}, 0}
  end

  def handle_call({:filter, filter}, _from, state) do
    reply =
      case classify_filter(filter) do
        :exact ->
          mod = string_to_module(filter)
          case Enum.member?(state.flat, mod) do
            true -> [mod]
            false -> []
          end
	{:prefix, prefix} ->
          state.flat
          |> Enum.filter(fn(m) -> String.starts_with?(inspect(m), prefix) end)
      end
    {:reply, reply, state, @timeout}
  end

  def handle_call(:all_modules, _from, state) do
    {:reply, state.flat, state, @timeout}
  end

  def handle_info(:timeout, state) do
    all = [node() | :erlang.nodes()]
    by_node = check(all, state.by_node)
    state = %State{
      by_node: by_node,
      flat: flatten(by_node)
    }
    {:noreply, state, @timeout}
  end

  defp check(nodes, loaded) do
    (nodes -- Map.keys(loaded))
    |> Enum.reduce(loaded, fn (n, all) ->
      case :rpc.call(n, :code, :all_loaded, []) do
        {:badrpc, _} ->
          all
        result ->
          Map.put(all, n, result)
      end
    end)
  end

  defp flatten(by_node) do
    Map.values(by_node)
    |> List.flatten()
    |> Enum.map(&(elem(&1, 0)))
    |> Enum.sort()
    |> Enum.uniq()
  end

  defp classify_filter(filter) do
    case String.split(filter, "*") do
      [prefix, ""] ->
        {:prefix, prefix}
      [_exact] ->
        :exact
      _ ->
        # FIXME other module matching filters
        :exact
    end
  end

  defp string_to_module(":" <> mod_str) do
    String.to_atom(mod_str)
  end
  defp string_to_module(str) do
    first = String.first(str)
    mod_str = case "A" <= first and first <= "Z" do
                true -> "Elixir." <> str
                false -> str
              end
    String.to_atom(mod_str)
  end
end
