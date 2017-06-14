defmodule WebTracer.Mixfile do
  use Mix.Project

  def project do
    [app: :tracy_web,
     version: "0.0.1",
     elixir: "~> 1.4",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     start_permanent: Mix.env == :prod,
     deps: deps(),
     name: "TracyWeb",
     description: description(),
     package: package(),
     source_url: "https://github.com/bettyblocks/tracy_web"]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {TracyWeb.Application, []},
     extra_applications: [:logger, :runtime_tools]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [{:phoenix, "~> 1.3.0-rc"},
     {:phoenix_pubsub, "~> 1.0"},
     {:phoenix_html, "~> 2.6"},
     {:phoenix_live_reload, "~> 1.0", only: :dev},
     {:gettext, "~> 0.11"},
     {:cowboy, "~> 1.0"},
     {:tracy, "~> 0.1"},
     {:ex_doc, ">= 0.0.0", only: :dev}
    ]
  end

  defp description do
    """
    Library for visual Elixir function call tracing.
    """
  end

  defp package do
    [
      files: ["lib", "README*", "mix.exs", "priv", "tracy.svg", "assets"],
      maintainers: ["Arjan Scherpenisse"],
      licenses: ["MIT"],
      links: %{"GitHub" => "https://github.com/bettyblocks/tracy_web"}
    ]
  end
end
