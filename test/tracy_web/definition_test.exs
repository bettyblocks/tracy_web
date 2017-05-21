defmodule TracyWeb.DefinitionTest do
  use ExUnit.Case

  alias TracyWeb.Definition
  alias Tracy.TraceConfig

  test "definition creator" do
    d = Definition.new(inclusions: ["a"])
    assert %Definition{inclusions: ["a"]} = d
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
