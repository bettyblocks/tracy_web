defmodule TracyWeb.Web.PageController do
  use TracyWeb.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
