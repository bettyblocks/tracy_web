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

  def handle_call({:check_start_trace, definition_id}, _from, state) do
    reply =
      case Registry.get(definition_id) do
        {:ok, definition} ->
          session = TracyWeb.Session.new(definition_id)
          :ok = TracyWeb.Storage.store_session(session)
          # start tracer process in supervisor
          {:ok, upstream} = UpstreamSupervisor.start_upstream(session)
          # tell the world about the new session
          TracyWeb.Web.Endpoint.broadcast("api", "new_session", session)
          # reply with the new process and the definition
          {:ok, {session.id, definition, upstream}}

        {:error, _} = e ->
          e
      end
    {:reply, reply, state}
  end
end
