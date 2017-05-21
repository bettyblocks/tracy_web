use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :tracy_web, TracyWeb.Web.Endpoint,
  http: [port: 4001],
  server: false

config :tracy_web, :definitions, [
  [id: "test", inclusions: ["String"]]
]

# Print only warnings and errors during test
config :logger, level: :warn
