defmodule TracyWeb.Upstream do
  use GenServer
  require Logger
  alias TracyWeb.Storage

  # Client API
  def start_link(definition_id, trace_id) do
    GenServer.start_link(__MODULE__, {definition_id, trace_id})
  end

  # Server callbacks

  def init({definition_id, trace_id}) do
    Storage.store_session(definition_id, trace_id)
    {:ok, {definition_id, trace_id}}
  end

  def handle_info(message, state={_, trace_id}) do
    Storage.store_trace(trace_id, message)
    {:noreply, state}
  end
end
