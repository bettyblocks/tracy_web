defmodule TracyWeb.Web.ApiChannel do
  use TracyWeb.Web, :channel

  alias TracyWeb.{Storage, Registry}

  def join("api", payload, socket) do
    {:ok, socket}
  end

  def handle_in("get_definitions", payload, socket) do
    definitions = %{definitions: Registry.all()}
    {:reply, {:ok, definitions}, socket}
  end

  def handle_in("get_sessions", definition_id, socket) do
    reply = %{sessions: Storage.get_sessions(definition_id)}
    {:reply, {:ok, reply}, socket}
  end

  def handle_in("get_definition", payload, socket) do
    definition = %{foo: "bar"}
    {:reply, {:ok, definition}, socket}
  end

  def handle_in("put_definition", payload, socket) do
    definition = 123
    Registry.put(definition)
    {:reply, {:ok, %{}}, socket}
  end

  def handle_in("mod_autocomplete", %{"text" => text}, socket) do
    q = text |> String.to_charlist() |> Enum.reverse()
    completions =
      case IEx.Autocomplete.expand(q) do
        {:yes, [], list} ->
          list |> Enum.map(&to_string/1)
        {:yes, result, []} ->
          [text <> IO.chardata_to_string(result)]
        {:no, _, _} ->
          []
      end
    {:reply, {:ok, %{completions: completions}}, socket}
  end

end
