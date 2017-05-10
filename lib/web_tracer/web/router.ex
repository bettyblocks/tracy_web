defmodule WebTracer.Web.Router do
  use WebTracer.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", WebTracer.Web do
    pipe_through :api
  end
end
