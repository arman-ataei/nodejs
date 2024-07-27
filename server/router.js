function route(pathname, handlers, response, request){
    console.log("Routing to "+ pathname )
    if(typeof handlers[pathname] === 'function'){
        return handlers[pathname](response, request)
    }else{
        return handlers['/404'](response)
    }
}


exports.route = route