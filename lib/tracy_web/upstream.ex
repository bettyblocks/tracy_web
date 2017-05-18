defmodule TracyWeb.Upstream do
  use GenServer
  require Logger
  alias TracyWeb.{Storage, Trace}

  # Client API
  def start_link(session) do
    GenServer.start_link(__MODULE__, session)
  end

  # Server callbacks

  def init(session) do
    {:ok, session}
  end

  def handle_info({:trace, _, _} = message, session) do
    trace = Trace.new(message)
    Storage.store_trace(session.id, trace)
    TracyWeb.Web.Endpoint.broadcast("tracer:" <> session.id, "trace", trace)
    {:noreply, session}
  end
end
