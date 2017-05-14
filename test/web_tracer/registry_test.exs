defmodule WebTracer.RegistryTest do
  use ExUnit.Case

  alias WebTracer.{Registry, Definition}

  test "registered under global name" do
    pid = :global.whereis_name(WebTracer.Registry)
    assert is_pid pid
    assert Process.alive? pid
  end

  test "Create configuration and look it up" do
    a = Definition.new(Aa)

    assert :ok = Registry.put(a)
    assert {:ok, ^a} = Registry.get(a.id)
  end
end
