const path = require("path/posix");

let handlers = {};

// Index handler
handlers.index = function(data,callback){
    let index = {
        'path' : data.path,
        'message' : 'This is the index page'
    }
    callback(index);
}

// 404 handlers
handlers.notFound = function(data,callback){
    let notFound = {
        'path': data.path,
        'message' : 'This is the 404 page'
    }
    callback(notFound);
}

handlers.products = function(data,callback){
    let products = {
        'productType' : 'phone',
        'color': 'black',
        'productPrice' : '$500'
    }
    callback(products);
}

module.exports = handlers;

