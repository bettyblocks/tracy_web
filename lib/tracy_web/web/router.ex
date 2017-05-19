defmodule TracyWeb.Web.Router do
  use TracyWeb.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TracyWeb.Web do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/d/:definition", PageController, :index
    get "/d/:definition/edit", PageController, :index
    get "/s/:definition/:session", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", TracyWeb.Web do
  #   pipe_through :api
  # end
end
