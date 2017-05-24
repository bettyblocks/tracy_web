defmodule TracyWebTest do
  use ExUnit.Case

  alias TracyWeb.{Definition, Registry, Storage}

  setup do
    d = Definition.new(inclusions: ["String"])
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

  @metadata %{"hello" => "there"}

  test "integration with storing metadata", %{definition: definition} do
    Tracy.check_start_trace(definition, nil, fn() -> @metadata end)
    {_, session_id} = assert_receive {:trace_started, _}

    String.downcase "AA"
    String.downcase "AB"

    :timer.sleep 100
    assert [session] = Storage.get_sessions(definition)
    assert session.id == session_id
    assert session.metadata == @metadata
  end

  test "upstream process gets stopped", %{definition: definition} do
    parent = self()

    spawn(fn ->
      :started = Tracy.check_start_trace(definition)
      assert_receive {:trace_started, _}

      send parent, :started

      String.downcase "AA"
      String.downcase "AB"
      send parent, :stopped
    end)

    assert_receive :started

    children = Supervisor.count_children(TracyWeb.UpstreamSupervisor)
    n = children.workers

    assert_receive :stopped
    :timer.sleep 50

    children = Supervisor.count_children(TracyWeb.UpstreamSupervisor)
    assert children.workers == n - 1

  end

end
