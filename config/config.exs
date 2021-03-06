# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :tracy_web, TracyWeb.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "czQRNR+t4wi+j61iY457bMuIuAS5zZT9aBYPrRcRrva9p0bv/LF0CmusYuMse/aR",
  render_errors: [view: TracyWeb.Web.ErrorView, accepts: ~w(json)],
  pubsub: [name: TracyWeb.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :tracy_web, :definitions, []

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
