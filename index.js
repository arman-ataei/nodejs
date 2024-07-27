const server = require("./server/server")
const router = require("./server/router")
const requestHandlers = require("./server/requestHandlers")

// handler is a key-vlue pair that handles the requests
var handlers = {}


handlers["/"] = requestHandlers.home
handlers["/home"] = requestHandlers.home
handlers["/form"] = requestHandlers.form
handlers["/404"] = requestHandlers.notFound
handlers["/uploaded"] = requestHandlers.uploaded
server.Start(router.route, handlers)