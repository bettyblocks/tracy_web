defmodule TracyWeb.Upstream do
  use GenServer
  require Logger
  alias TracyWeb.{Storage, Trace}

  # Client API
  def start_link(session) do
    GenServer.start_link(__MODULE__, session)
  end

  @timeout 200

  # Server callbacks
  defmodule State do
    defstruct session: nil, traces: [], last_flush: 0
  end

  def init(session) do
    state = %State{session: session, last_flush: now_ms()}
    {:ok, state}
  end

  def handle_info({:trace, _, _} = message, %State{session: session, traces: traces} = state) do
    trace = Trace.new(message)
    Storage.store_trace(session.id, trace)
    IO.inspect session.id, label: "store"
    state = opt_flush(%State{state | traces: [trace | traces]})
    {:noreply, state, @timeout}
  end

  def handle_info(:timeout, state) do
    {:noreply, opt_flush(state)}
  end

  defp now_ms() do
    div(:erlang.system_time, 1_000_000)
  end

  defp opt_flush(state = %State{traces: []}) do
    state
  end
  defp opt_flush(state) do
    now = now_ms()
    case (now - state.last_flush >= @timeout) do
      true ->
        TracyWeb.Web.Endpoint.broadcast("tracer:" <> state.session.id, "add_traces", %{traces: state.traces})
        %State{state | last_flush: now, traces: []}
      false ->
        state
    end
  end

end
