defmodule TracyWeb.Definition do
  defstruct id: nil, label: nil, inclusions: [], exclusions: [], max_entries: 10_000

  alias __MODULE__, as: Definition
  alias Tracy.TraceConfig

  @fields [:id, :inclusions, :exclusions, :label, :max_entries]

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
    |> Enum.reduce([], fn({k, v}, acc) ->
      case validate(k, v) do
        nil -> acc
        {_, _} = pair -> [pair | acc]
      end
    end)
    |> new()
  end

  defp validate("id", v) when is_binary(v), do: {:id, v}
  defp validate("label", v) when is_binary(v), do: {:label, v}
  defp validate("max_entries", v) when is_integer(v), do: {:max_entries, v}
  defp validate("inclusions", l) when is_list(l), do: {:inclusions, l}
  defp validate("exclusions", l) when is_list(l), do: {:exclusions, l}
  defp validate(_, _), do: nil

  def to_trace_config(definition, upstream \\ nil) do
    modules =
      (expand_modules(definition.inclusions) -- expand_modules(definition.exclusions))
      |> Enum.uniq()

    %TraceConfig{
      id: definition.id,
      max_entries: definition.max_entries,
      modules: modules,
      upstream: upstream}
  end

  defp expand_modules(patterns) do
    (for pattern <- patterns do
         TracyWeb.ModuleServer.filter(pattern)
     end)
     |> List.flatten()
  end
end
