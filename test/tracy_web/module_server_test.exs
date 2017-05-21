defmodule TracyWeb.ModuleServerTest do
  use ExUnit.Case

  alias TracyWeb.ModuleServer

  test "Module server all modules" do
    all = ModuleServer.all_modules()
    assert Enum.count(all) > 0
    for m <- all do
      assert is_atom(m)
    end
  end

  test "exact match" do
    assert [] == ModuleServer.filter("Cod")
    assert [String] == ModuleServer.filter("String")
  end

  test "wildcards" do
    assert [Code] == ModuleServer.filter("Cod*")
  end


end
