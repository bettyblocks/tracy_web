defmodule WebTracer.Definition do
  defstruct modules: [], id: nil

  alias __MODULE__, as: Definition

  def id() do
    :crypto.strong_rand_bytes(20) |> Base.encode64
  end

  def new(modules) do
    %Definition{modules: modules, id: id()}
  end

  def start_trace(definition, pid \\ self()) do
  end

  def stop_trace(definition, pid \\ self()) do
  end

end
