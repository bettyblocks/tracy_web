defmodule TracyWeb.RegistryTest do
  use ExUnit.Case

  alias TracyWeb.Registry
  alias Tracy.Definition

  test "registered process" do
    pid = Process.whereis(TracyWeb.Registry)
    assert is_pid pid
    assert Process.alive? pid
  end

  test "Create configuration and look it up" do
    a = Definition.new(Aa)
    assert :ok = Registry.put(a)
    assert {:ok, ^a} = Registry.get(a.id)
  end
end
