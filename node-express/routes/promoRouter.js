const express = require('express');
const bodyParser = require('body-parser');


const promoRouter = express.Router();

promoRouter.use(bodyParser.json());
//for all the requests - GET,PUT,POST,DELETE
//1st app.all will be executed and later rest will be executed due to next() 
//---- depending on the GET,POST etc. request the related .get() or .post()  or .etc. will be executed
promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode= 200;
    res.setHeader('Content-type','text/plain');

    next();//it will continue to look for additional specifications that will match the /promotions endpoint

})
// if modified res or req object above - that modified object is used below
.get((req,res,next) =>{
    res.end("Will send all the promotions to you!");
})
.post((req,res,next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);//using body parser
})
.put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
  })
.delete((req, res, next) => {
      res.end('Deleting all promotions');
  })
 
//1st group ends here 

promoRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode= 200;
    res.setHeader('Content-type','text/plain');
    next();//it will continue to look for additional specifications that will match the /promotions endpoint

})
.get( (req,res,next) => {
      res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
  })
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
  })
.put( (req, res, next) => {
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + 
          ' with details: ' + req.body.description);
  })
.delete((req, res, next) => {
      res.end('Deleting promotion: ' + req.params.promoId);
  });

  module.exports = promoRouter;
