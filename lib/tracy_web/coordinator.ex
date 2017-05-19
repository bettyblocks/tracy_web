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

  def check_start_trace(definition_id, session_id \\ nil) do
    GenServer.call(name(), {:check_start_trace, definition_id, session_id})
  end

  defp name() do
    {:global, __MODULE__}
  end

  # Server callbacks
  def init([]) do
    {:ok, %{}}
  end

  def handle_call({:check_start_trace, definition_id, session_id}, _from, state) do
    reply =
      case Registry.get(definition_id) do
        {:ok, definition} ->
          session = TracyWeb.Session.new(definition_id, session_id)
          # start tracer process in supervisor
          {:ok, upstream} = UpstreamSupervisor.start_upstream(session)
          # reply with the new process and the definition
          {:ok, {session.id, definition, upstream}}

        {:error, _} = e ->
          e
      end
    {:reply, reply, state}
  end
end
