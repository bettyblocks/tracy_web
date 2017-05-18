defmodule TracyWeb.Storage do

  @trace_table Module.concat(__MODULE__, Traces)
  @session_table Module.concat(__MODULE__, Sessions)

  def init do
    :ets.new(@trace_table, [:ordered_set, :named_table, :public, {:write_concurrency, true}, {:read_concurrency, true}])
    :ets.new(@session_table, [:ordered_set, :named_table, :public, {:write_concurrency, true}, {:read_concurrency, true}])
    :ok
  end

  def store_session(session) do
    key = {session.definition_id, :erlang.system_time()}
    true = :ets.insert(@session_table, {key, session})
    :ok
  end

  def store_trace(session_id, trace) do
    key = {session_id, :erlang.system_time()}
    true = :ets.insert(@trace_table, {key, trace})
    :ok
  end

  def get_traces(session_id) do
    :ets.match_object(@trace_table, {{session_id, :_}, :_})
    |> Enum.map(fn({{_session_id, ts}, trace}) -> trace end)
    |> Enum.reverse()
  end

  def get_sessions(definition_id) do
    :ets.match_object(@session_table, {{definition_id, :_}, :_})
    |> Enum.map(fn({{_definition_id, ts}, session}) -> session end)
    |> Enum.reverse()
  end

end
