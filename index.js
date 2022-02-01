const http = require('http');
const hostname = 'localhost';
const port = 3000;

//setting up server
//req = incomming request
const server = http.createServer((req,res) => {
    console.log(req.headers);

    res.statusCode =200;
    //enables to setup status code for response message

    res.setHeader('Content-Type' , 'text/html');
    res.end('<html><body><h1> Hello, World! </h1></body></html>');


})

server.listen(port,hostname,() => {
    console.log(`Server running at http://${hostname}:${port}`);
});