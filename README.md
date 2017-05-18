# Tracy

## `tracy_web` - web interface

Provides a web user interface for the Tracy function tracer.

The web UI is a separate phoenix app which runs as a separate node. It
serves a web interface (ReactJS powered) which allows you to configure
how to trace a request.

### User interaction

* Create new tracer configuration or select one from the list of
  existing configurations
* Open tracer config details
* Copy the trace config key
* Click "trace" to start

Now a new trace log opens which streams the results in real time. The
tracing stops when the traced process exists or the trace limit is
hit.


## `tracy` - tracing library

The tracing library is a separate OTP app which runs on the node to be
traced, similar to Recon.

The tracing is limited to function call tracing, for a specific
process. The actual tracing is done on the specific node where the
process runs.

In the app to be traced, a trace config key must be used to start
tracing a request. This config key can be put in a HTTP request
header, for instance.

The tracing starts for a process when a helper function is called with
a valid tracer configuration key. (e.g.:
`WebTracer.start_trace("configkey", self())`).

On the node, the following information is collected for each function
that a traced process hits:

* Module / function / arguments
* Return value
* Return location
* Timing

Only one tracer configuration can be active on a node. This is a
limitation of the BEAM tracing API.


## Installation

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4100`](http://localhost:4100) from your browser.
