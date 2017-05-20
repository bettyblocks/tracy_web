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

  def handle_in("get_modules", _payload, socket) do
    modules = TracyWeb.ModuleServer.all_modules()
    {:reply, {:ok, %{modules: modules}}, socket}
  end

end
