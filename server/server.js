const http = require('http');

const url = require("url")

function Start(route, handlers){

    function onRequest(request, response){
        var baseURL =  request.protocol + '://' + request.headers.host + '/';
        var pathname = new url.URL(request.url,baseURL);
        console.log(`Request for ${pathname} and ${request.url} received.` )

        route(request.url,handlers, response, request)
    }

    http.createServer(onRequest).listen(8888); 
    console.log("server is started.")

}

exports.Start = Start