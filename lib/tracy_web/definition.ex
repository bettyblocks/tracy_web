defmodule TracyWeb.Definition do
  defstruct id: nil, label: nil, inclusions: [], exclusions: []

  alias __MODULE__, as: Definition
  alias Tracy.TraceConfig

  @fields [:id, :inclusions, :exclusions, :label]
  @str_fields ~w(id inclusions exclusions label)

  def new(opts \\ []) do
    definition =
      Keyword.take(opts, @fields)
      |> Enum.reduce(%Definition{},
    fn({key, value}, definition) ->
      Map.put(definition, key, value)
    end)
    %Definition{
      definition |
      id: definition.id || Tracy.Util.id()}
  end

  def from_payload(payload) do
    payload
    |> Enum.map(fn({k, v}) -> {String.to_atom(k), v} end)
    |> new()
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
