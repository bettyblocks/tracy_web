defmodule TracyWeb.Application do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      supervisor(TracyWeb.Web.Endpoint, []),
      worker(TracyWeb.Registry, []),
    ]

    opts = [strategy: :one_for_one, name: TracyWeb.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
