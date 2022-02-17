const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');
const promoRouter = express.Router();
const authenticate = require('../authenticate');
promoRouter.use(bodyParser.json());

promoRouter.route('/')
// if modified res or req object above - that modified object is used below
.get((req,res,next) =>{
  Promotions.find({})
  .then((promotions)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(promotions);
  }, (err)=> next(err))
  .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
  Promotions.create(req.body)
  .then((promotion)=>{
    console.log('Promotion Created',promotion);
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(promotion);
  },(err)=> next(err))
  .catch((err) => next(err));
})
.put( authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
  })
.delete(authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
  Promotions.remove({})
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
  },(err)=> next(err))
  .catch((err) => next(err));
  });
 
//1st group ends here 

promoRouter.route('/:promoId')
.get( (req,res,next) => {
  Promotions.findById(req.params.promoId)
  .then((promotion)=>{
   res.statusCode=200;
   res.setHeader('Content-Type','application/json');
   res.json(promotion);

 },(err)=> next(err))
 .catch((err) => next(err));
  })
.post(authenticate.verifyUser,authenticate.verifyAdmin,  (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
  })
.put(authenticate.verifyUser,authenticate.verifyAdmin,  (req, res, next) => {
  Promotions.findByIdAndUpdate(req.params.promoId,{
    $set: req.body
  },{ new:true })
  .then((promotion)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(promotion);

  },(err)=> next(err))
  .catch((err) => next(err));
  })
.delete(authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
  Promotions.findByIdAndRemove(req.params.promoId)
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
  },(err)=> next(err))
  .catch((err) => next(err));
  });
/*
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
*/
  module.exports = promoRouter;
