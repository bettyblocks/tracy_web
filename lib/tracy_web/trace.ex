defmodule TracyWeb.Trace do

  defstruct time: nil, type: nil, module: nil, function: nil, args: nil
  alias __MODULE__, as: Trace

  def new(_trace, time \\ DateTime.utc_now())

  def new({:trace, :call, {module, function, args}}, time) do
    %Trace{
      time: time,
      type: :call,
      module: module,
      function: function,
      args: inspect(args, pretty: true, width: 40)
    }
  end
  def new({:trace, :return_to, {module, function, arity}}, time) do
    %Trace{
      time: time,
      type: :return,
      module: module,
      function: function,
      args: arity
    }
  end
end
