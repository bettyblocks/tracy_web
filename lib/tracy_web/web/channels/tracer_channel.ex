defmodule TracyWeb.Web.TracerChannel do
  use TracyWeb.Web, :channel

  alias TracyWeb.Storage

  def join("tracer:" <> session_id, _payload, socket) do
    send(self(), :after_join)
    {:ok, assign(socket, :session_id, session_id)}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (tracer:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    traces = Storage.get_traces(socket.assigns.session_id)
    push socket, "traces", %{traces: traces}
    {:noreply, socket}
  end
end
