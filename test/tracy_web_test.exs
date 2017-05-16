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
    assert [_, _, _, _] = Storage.all(session)


  end
end
