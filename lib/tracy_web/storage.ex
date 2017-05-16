defmodule TracyWeb.Storage do

  @trace_table Module.concat(__MODULE__, Traces)
  @session_table Module.concat(__MODULE__, Sessions)

  def init do
    :ets.new(@trace_table, [:ordered_set, :named_table, :public, {:write_concurrency, true}, {:read_concurrency, true}])
    :ets.new(@session_table, [:ordered_set, :named_table, :public, {:write_concurrency, true}, {:read_concurrency, true}])
    :ok
  end

  def store_session(definition_id, session_id) do
    key = {definition_id, :erlang.system_time()}
    :ets.insert(@session_table, {key, session_id})
  end

  def store_trace(session_id, trace) do
    key = {session_id, :erlang.system_time()}
    :ets.insert(@trace_table, {key, trace})
  end

  def get_traces(session_id) do
    :ets.match_object(@trace_table, {{session_id, :_}, :_})
  end

  def get_sessions(definition_id) do
    :ets.match_object(@session_table, {{definition_id, :_}, :_})
  end

end
