defmodule TracyWeb.UpstreamSupervisor do
  use Supervisor

  def start_link do
    Supervisor.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init([]) do
    children = [
      worker(TracyWeb.Upstream, [], restart: :transient)
    ]
    supervise(children, strategy: :simple_one_for_one)
  end

  def start_upstream(session) do
    Supervisor.start_child(__MODULE__, [session])
  end

end
