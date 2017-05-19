defmodule TracyWebTest do
  use ExUnit.Case

  alias Tracy.Definition
  alias TracyWeb.{Registry, Storage}

  setup do
    d = Definition.new([String])
    :ok = Registry.put(d)
    {:ok, %{definition: d.id}}
  end

  test "integration", %{definition: definition} do
    Tracy.check_start_trace(definition)
    {_, session} = assert_receive {:trace_started, _}

    String.downcase "AA"
    String.downcase "AB"

    :timer.sleep 100
    assert [sess] = Storage.get_sessions(definition)
    assert sess.id != nil
    assert [_, _, _, _] = Storage.get_traces(session)
  end

  test "integration with preset session id", %{definition: definition} do
    Tracy.check_start_trace(definition, "my_session_id")
    {_, session} = assert_receive {:trace_started, _}

    String.downcase "AA"
    String.downcase "AB"

    :timer.sleep 100
    assert [sess] = Storage.get_sessions(definition)
    assert "my_session_id" == sess.id
    assert [_, _, _, _] = Storage.get_traces(session)
  end

  test "preset definitions are loaded from config" do
    keys = Map.keys(TracyWeb.Registry.all())
    assert Enum.member?(keys, "test")
  end

end
