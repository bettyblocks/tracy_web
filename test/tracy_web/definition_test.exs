defmodule TracyWeb.DefinitionTest do
  use ExUnit.Case

  alias TracyWeb.Definition
  alias Tracy.TraceConfig

  test "definition creator" do
    d = Definition.new(inclusions: ["a"])
    assert %Definition{inclusions: ["a"]} = d
  end

  test "from payload" do
    d = Definition.from_payload(%{"max_entries" => 100, "inclusions" => ["String"]})
    assert d.max_entries == 100
    assert d.id != nil
    assert d.inclusions == ["String"]
    assert d.exclusions == []
  end

  test "definition to trace config" do
    d = %Definition{inclusions: ["String"]}
    c = Definition.to_trace_config(d)

    assert %TraceConfig{modules: [String]} = c
  end

  test "definition to trace config with wildcard" do
    d = %Definition{inclusions: ["String.Br*"]}
    c = Definition.to_trace_config(d)

    assert %TraceConfig{modules: [String.Break]} = c
  end

end
