defmodule TracyWeb.Session do

  defstruct id: nil, definition_id: nil, time: nil, metadata: %{}
  alias __MODULE__, as: Session

  def new(definition_id, session_id \\ nil, metadata \\ %{}, time \\ DateTime.utc_now()) do
    %Session{
      id: session_id || Tracy.Util.id(),
      definition_id: definition_id,
      time: time,
      metadata: metadata
    }
  end
end
