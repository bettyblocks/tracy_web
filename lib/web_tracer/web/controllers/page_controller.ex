defmodule WebTracer.Web.PageController do
  use WebTracer.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
