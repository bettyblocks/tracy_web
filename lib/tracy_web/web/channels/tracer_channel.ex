defmodule TracyWeb.Web.TracerChannel do
  use TracyWeb.Web, :channel

  def join("tracer:" <> session_id, payload, socket) do
    {:ok, assign(socket, :session_id, session_id)}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (tracer:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end
end
