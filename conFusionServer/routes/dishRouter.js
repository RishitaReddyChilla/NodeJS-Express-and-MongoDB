const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');


const dishRouter = express.Router();

dishRouter.use(bodyParser.json());
dishRouter.route('/')
// if modified res or req object above - that modified object is used below
.get((req,res,next) =>{
    Dishes.find({})
    .then((dishes)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(dishes);
    }, (err)=> next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Dishes.create(req.body)
    .then((dish)=>{
      console.log('Dish Created',dish);
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(dish);

    },(err)=> next(err))
    .catch((err) => next(err));
})
.put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
  })
.delete((req, res, next) => {
  Dishes.remove({})
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
  },(err)=> next(err))
  .catch((err) => next(err));
});
//1st group ends here 

dishRouter.route('/:dishId')
.get( (req,res,next) => {
     Dishes.findById(req.params.dishId)
     .then((dish)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(dish);

    },(err)=> next(err))
    .catch((err) => next(err));
  })
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
  })
.put( (req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId,{
      $set: req.body
    },{ new:true })
    .then((dish)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(dish);

    },(err)=> next(err))
    .catch((err) => next(err));
  })
.delete((req, res, next) => {
      Dishes.findByIdAndRemove(req.params.dishId)
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
  })
 
//1st group ends here 

dishRouter.route('/:dishId')
.all((req,res,next) => {
    res.statusCode= 200;
    res.setHeader('Content-type','text/plain');
    next();//it will continue to look for additional specifications that will match the /dishes endpoint

})
.get( (req,res,next) => {
      res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
  })
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
  })
.put( (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
          ' with details: ' + req.body.description);
  })
.delete((req, res, next) => {
      res.end('Deleting dish: ' + req.params.dishId);
  });
*/
  module.exports = dishRouter;
