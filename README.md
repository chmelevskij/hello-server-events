# Server Sent Event Demo

Small demo to see how would mongodb change streams work with server sent events,
using `AsyncIterable` to listen for mongo changes.

Using http2 since there are some issues with http1 and to many connections.
`http2` needs a https by default, so there is a script which needs create
certificates, how to add them refer to your OS.
