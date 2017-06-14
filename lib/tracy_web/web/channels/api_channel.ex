defmodule TracyWeb.Web.ApiChannel do
  use TracyWeb.Web, :channel

  alias TracyWeb.{Storage, Registry, Definition}

  def join("api", _payload, socket) do
    {:ok, socket}
  end

  def handle_in("get_definitions", _payload, socket) do
    definitions = %{definitions: Registry.all()}
    {:reply, {:ok, definitions}, socket}
  end

  def handle_in("get_sessions", definition_id, socket) do
    reply = %{sessions: Storage.get_sessions(definition_id)}
    {:reply, {:ok, reply}, socket}
  end

  def handle_in("get_definition", _payload, socket) do
    definition = %{foo: "bar"}
    {:reply, {:ok, definition}, socket}
  end

  def handle_in("put_definition", payload, socket) do
    Registry.put(Definition.from_payload(payload))
    {:reply, {:ok, %{}}, socket}
  end

  def handle_in("remove_definition", %{"id" => id}, socket) do
    :ok = Registry.remove(id)
    {:reply, {:ok, %{}}, socket}
  end

  def handle_in("get_modules", _payload, socket) do
    modules =
      TracyWeb.ModuleServer.all_modules()
      |> Enum.map(&Kernel.inspect/1)
    {:reply, {:ok, %{modules: modules}}, socket}
  end

end
