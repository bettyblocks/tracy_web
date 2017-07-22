# Tracy [![Build Status](https://travis-ci.org/bettyblocks/tracy_web.svg?branch=master)](https://travis-ci.org/bettyblocks/tracy_web)

## `tracy_web` - web interface

Provides a web user interface for the Tracy function tracer.

The web UI is a separate phoenix app which runs as a separate node. It
serves a web interface (ReactJS powered) which allows you to configure
how to trace a request.

### User interaction

* Create new tracer definition or select one from the list of
  existing definitions
* Open tracer definition details
* Copy the trace definition key using the button
* Make a HTTP request with the trace request header

Now a new trace log opens which streams the results in real time. The
tracing stops when the traced process exists or the trace limit is
hit.


## `tracy` - tracing library

The tracing library is a separate OTP app which runs on the node to be
traced, similar to Recon.

The tracing is limited to function call tracing, for a specific
process. The actual tracing is done on the specific node where the
process runs.

Traces are defined by their "definition". Each definition defines
which function calls are going to be traced, specified on the module
level. To start a trace, a process must know its trace "definition"
key, and call `Tracy.check_start_trace/1` using this key. This key can
be put in a HTTP request header, for instance. The `Tracy.Plug`
extension automatically starts tracing a request whenever the
`x-tracy-definition` request header is set to a valid definition key.

On the node, the following information is collected for each function
that a traced process hits:

* Module / function / arguments
* Return value
* Return location
* Timing

Note that one process can be traced at a time per node. This is a
limitation of Erlang's tracing API. In practice, this is not a big deal.


## Installation

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4100`](http://localhost:4100) from your browser.
