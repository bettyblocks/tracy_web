defmodule TracyWeb.CoordinatorTest do
  use ExUnit.Case

  alias TracyWeb.Coordinator
  alias TracyWeb.Registry
  alias TracyWeb.Definition

  test "globally registered process" do
    pid = :global.whereis_name(TracyWeb.Coordinator)
    assert is_pid pid
    assert Process.alive? pid
  end

  test "check start trace - without definition" do
    assert {:error, :not_found} == Coordinator.check_start_trace("asfd")
  end

  test "check start trace - with definition" do
    d = Definition.new(inclusions: ["String"])
    :ok = Registry.put(d)
    assert {:ok, {_session_id, cfg}} = Coordinator.check_start_trace(d.id)

    assert [String] == cfg.modules
    assert is_pid(cfg.upstream)
  end

end
