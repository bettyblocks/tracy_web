defmodule TracyWeb.Registry do
  @doc """
  Storage for tracing definitions
  """
  use GenServer

  # Client API
  def start_link() do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def put(definition) do
    GenServer.call(__MODULE__, {:put, definition})
  end

  def get(id) do
    GenServer.call(__MODULE__, {:get, id})
  end

  def all() do
    GenServer.call(__MODULE__, :all)
  end

  # Server callbacks
  def init([]) do
    {:ok, %{}}
  end

  def handle_call({:put, definition}, _from, state) do
    state =
      state |> Map.put(definition.id, definition)
    {:reply, :ok, state}
  end

  def handle_call({:get, id}, _from, state) do
    reply =
      case Map.get(state, id) do
        nil -> {:error, :not_found}
        d -> {:ok, d}
      end
    {:reply, reply, state}
  end

  def handle_call(:all, _from, state) do
    {:reply, state, state}
  end

end
