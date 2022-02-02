const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

//for all the requests - GET,PUT,POST,DELETE
//1st app.all will be executed and lated due to next() 
//---- depending on the GET,POST etc. the related app.get() or app.post()  or app.etc. will be executed
app.all('/dishes',(req,res,next) => {
    res.statusCode= 200;
    res.setHeader('Content-type','text/plain');

    next();//it will continue to look for additional specifications that will match the /dishes endpoint

});
// if modified res or req object above - that modified object is used below
app.get('/dishes',(req,res,next) =>{
    res.end("Will send all the dishes to you!");
});

app.post('/dishes',(req,res,next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);//using body parser
});

app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
  });
   
app.delete('/dishes', (req, res, next) => {
      res.end('Deleting all dishes');
  });
  
app.get('/dishes/:dishId', (req,res,next) => {
      res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
  });
  
app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
  });
  
app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
          ' with details: ' + req.body.description);
  });
  
app.delete('/dishes/:dishId', (req, res, next) => {
      res.end('Deleting dish: ' + req.params.dishId);
  });

app.use(express.static(__dirname+'/public')); //folder for which static html files will be served up

app.use((req, res, next ) => {
   // console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'text/html');
    res.end('<html><body><h1> This is an Express Server </h1></body></html>');
});

const server =  http.createServer(app);
server.listen(port,hostname,() => {
    console.log(`Server running at http://${hostname}:${port}`);
});

