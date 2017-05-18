defmodule TracyWeb.StorageTest do
  use ExUnit.Case

  alias TracyWeb.{Trace, Session, Storage}

  test "store and retrieve traces" do
    trace = Trace.new({:trace, :call, {String, :upcase, ["a"]}})
    :ok = Storage.store_trace("x", trace)
    assert [^trace] = Storage.get_traces("x")
  end

  test "store and retrieve sessions" do
    session = Session.new("a")
    :ok = Storage.store_session(session)
    assert [] = Storage.get_sessions("asdfasdf")
    assert [^session] = Storage.get_sessions("a")
  end

end
