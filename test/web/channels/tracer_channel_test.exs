defmodule WebTracer.Web.TracerChannelTest do
  use WebTracer.Web.ChannelCase

  alias WebTracer.Web.TracerChannel

  setup do
    {:ok, _, socket} =
      socket("user_id", %{})
      |> subscribe_and_join(TracerChannel, "tracer")
    {:ok, socket: socket}
  end

  test "ping replies with status ok", %{socket: socket} do
    ref = push socket, "ping", %{"hello" => "there"}
    assert_reply ref, :ok, %{"hello" => "there"}
  end

end
