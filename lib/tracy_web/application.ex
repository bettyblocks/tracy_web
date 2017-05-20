defmodule TracyWeb.Application do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      worker(TracyWeb.Registry, []),
      worker(TracyWeb.Coordinator, []),
      worker(TracyWeb.ModuleServer, []),
      supervisor(TracyWeb.UpstreamSupervisor, []),
      supervisor(TracyWeb.Web.Endpoint, []),
    ]

    :ok = TracyWeb.Storage.init()
    spawn(fn ->
      :timer.sleep 100
      after_init()
    end)

    opts = [strategy: :one_for_one, name: TracyWeb.Supervisor]
    Supervisor.start_link(children, opts)
  end

  defp after_init do
    for preset <- Application.get_env(:tracy_web, :definitions, []) do
      d = Tracy.Definition.new(preset[:modules])
      d = %{d | id: preset[:id]}
      TracyWeb.Registry.put(d)
    end
  end

end
