use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :tracy_web, TracyWeb.Web.Endpoint,
  http: [port: 4100],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [npm: ["run", "dev", cd: Path.expand("../assets", __DIR__)]]

config :logger, :console, format: "[$level] $message\n"

config :tracy_web, :definitions, [
  [id: "test", modules: [String]],
  [id: "betty", modules: [Betty.App.Meta, Betty.App.Matcher, Betty.Repo]]
]


# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20
