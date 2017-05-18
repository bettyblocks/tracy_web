defmodule TracyWeb.Session do

  defstruct id: nil, definition_id: nil, time: nil
  alias __MODULE__, as: Session

  def new(definition_id, time \\ DateTime.utc_now()) do
    %Session{
      id: Tracy.Util.id(),
      definition_id: definition_id,
      time: time
    }
  end
end
