defmodule TracyWeb.Upstream do
  use GenServer
  require Logger
  alias TracyWeb.Storage

  # Client API
  def start_link(id) do
    GenServer.start_link(__MODULE__, id)
  end

  # Server callbacks

  def init(id) do
    {:ok, id}
  end

  def handle_info(message, id) do
    Storage.store_trace(id, message)
    {:noreply, id}
  end
end
