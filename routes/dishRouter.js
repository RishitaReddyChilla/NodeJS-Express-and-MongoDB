const express = require('express');
const bodyParser = require('body-parser');


const dishRouter = express.Router();

dishRouter.use(bodyParser.json());
//for all the requests - GET,PUT,POST,DELETE
//1st app.all will be executed and lated due to next() 
//---- depending on the GET,POST etc. the related app.get() or app.post()  or app.etc. will be executed
dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode= 200;
    res.setHeader('Content-type','text/plain');

    next();//it will continue to look for additional specifications that will match the /dishes endpoint

})
// if modified res or req object above - that modified object is used below
.get((req,res,next) =>{
    res.end("Will send all the dishes to you!");
})
.post((req,res,next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);//using body parser
})
.put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
  })
.delete((req, res, next) => {
      res.end('Deleting all dishes');
  });
 
//1st group ends here 
/*
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
  */

  module.exports = dishRouter;
