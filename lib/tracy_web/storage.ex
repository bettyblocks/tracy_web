defmodule TracyWeb.Storage do

  @table __MODULE__

  def init do
    :ets.new(@table, [:ordered_set, :named_table, :public, {:write_concurrency, true}, {:read_concurrency, true}])
    :ok
  end

  def store_trace(session_id, trace) do
    key = {session_id, :erlang.system_time()}
    :ets.insert(@table, {key, trace})
  end

  def all(session_id) do
    :ets.match_object(@table, {{session_id, :_}, :_})
  end

end
