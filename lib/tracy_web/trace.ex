defmodule TracyWeb.Trace do

  defstruct trace: nil, time: nil
  alias __MODULE__, as: Trace

  def new({:trace, _type, _payload} = trace, time \\ DateTime.utc_now()) do
    %Trace{
      time: time,
      trace: inspect(trace)
    }
  end
end
