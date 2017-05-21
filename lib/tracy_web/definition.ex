defmodule TracyWeb.Definition do
  defstruct id: nil, label: nil, inclusions: [], exclusions: []

  alias __MODULE__, as: Definition
  alias Tracy.TraceConfig

  def new(opts \\ []) do
    definition = %Definition{id: opts[:id] || Tracy.Util.id()}
    Keyword.take(opts, [:inclusions, :exclusions, :label])
    |> Enum.reduce(definition,
    fn({key, value}, definition) ->
      Map.put(definition, key, value)
    end)
  end

  def to_trace_config(definition, upstream \\ nil) do
    id = definition.id

    modules = (expand_modules(definition.inclusions) -- expand_modules(definition.exclusions))
    |> Enum.uniq()

    %TraceConfig{id: id, modules: modules, upstream: upstream}
  end

  defp expand_modules(patterns) do
    (for pattern <- patterns do
         TracyWeb.ModuleServer.filter(pattern)
     end)
    |> List.flatten()
  end
end
