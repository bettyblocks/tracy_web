defmodule TracyWeb.Coordinator do
  use GenServer

  alias TracyWeb.{Registry, UpstreamSupervisor}

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
          id = Tracy.Util.id()
          # start tracer process in supervisor
          {:ok, upstream} = UpstreamSupervisor.start_upstream(id)
          # reply with the new process and the definition
          {:ok, {id, definition, upstream}}

        {:error, _} = e ->
          e
      end
    {:reply, reply, state}
  end
end
