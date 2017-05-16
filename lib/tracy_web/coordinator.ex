defmodule TracyWeb.Coordinator do
  use GenServer

  alias TracyWeb.Registry

  # Client API
  def start_link() do
    GenServer.start_link(__MODULE__, [], name: name())
  end

  def put(definition) do
    GenServer.call(name(), {:put, definition})
  end

  def check_start_trace(identifier) do
    GenServer.call(name(), {:check_start_trace, identifier})
  end

  defp name() do
    {:global, __MODULE__}
  end

  # Server callbacks
  def init([]) do
    {:ok, %{}}
  end

  def handle_call({:check_start_trace, identifier}, _from, state) do
    reply =
      case Registry.get(identifier) do
        {:ok, definition} ->
          # start tracer process in supervisor
      end
    {:reply, reply, state}
  end
end
