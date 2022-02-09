// Dependencies
const http = require('http');
const handlers = require('./handlers');
const stringDecoder = require('string_decoder').StringDecoder;

// Server variable
const hostname = '127.0.0.1';
const port = 3000;

// Create the server
const server = http.createServer(function(req,res){

    // Take the url string
    let queryUrl = req.url;

    // Build the URL object
    let parsedUrl = new URL(queryUrl,'http://localhost:3000');

    // Extract the path from the URL object
    let path = parsedUrl.pathname;

    // Clean from slash
    const newPath = path.replace(/^\/+|\/+$/g,'');

    // Init string decoder
    let decoder = new stringDecoder('utf-8');

    // Init buffer string
    let buffer = '';

    // Write buffer on data event
    req.on('data',function(data){
        buffer += decoder.write(data);
    })

    // Close the data event
    req.on('end',function(){
        buffer += decoder.end();

        // parse string into json
        parseJsonToObject = function(str){
            try{
                let obj = JSON.parse(str);
                return obj;
            } catch(e){
                return{};
            }
        }

        // Create the data object
        let data = {
            'path' : newPath,
            'payload':parseJsonToObject(buffer),
        }

        // Routing the request
        let chosenHandler = typeof(router[newPath]) !== 'undefined' ? router[newPath] : handlers.notFound;
       
        chosenHandler(data,function(payload){
            // Send the response
            payloadstring = JSON.stringify(payload);

            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.end(payloadstring);
        })

    })


})

// Define the router
router = {
    '' : handlers.index,
    'products':handlers.products,
}

// Start the server
server.listen(port,hostname,function(){
    console.log('Server is running on port: ' + port);
})