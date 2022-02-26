var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var Favorite = require('../models/favorite');
const Dishes = require('../models/dishes');
const cors = require('./cors');
var authenticate = require('../authenticate');


const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

// '/favorites' endpoint
favoriteRouter.route('/')
.options(cors.cors,(req,res)=>{
    res.sendStatus(200);
  })
.get(cors.cors,authenticate.verifyUser,(req,res,next) =>{
    Favorite.findOne({ user: req.user._id })
    .then((favorite)=>{
      if(favorite){
        Favorite.findById(favorite._id)
        .populate('user')
        .populate('dishes')
        .then((favorite)=>{
          res.statusCode=200;
          res.setHeader('Content-Type','application/json');
          res.json(favorite);
        }, (err) => next(err));
      }
      else
      {
        res.statusCode = 404;
				res.setHeader('Content-Type', 'application/json');
				return res.json('No Favorites added');
      }
    }, (err)=> next(err))
    .catch((err) => next(err));
})


.post(cors.corsWithOptions,authenticate.verifyUser, (req,res,next) => {
  Favorite.findOne({ user: req.user._id })
  .then((favorite)=>{
    if(!favorite)
    {
      Favorite.create({
      user: req.user._id,
      dishes: req.body
      }),(err,document)=>{
        if(document)
        {
          console.log('Document Created',document);
          res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					return res.json(document);
        }
        else{
          return next(err);
        }
      }
    }
    else{
      for(var i=0; i<req.body.length ;i++)
      {
        if(favorite.dishes.indexOf(req.body[i]._id)<0)//if the dish to be added does not already exist as favorite
        {
          favorite.dishes.unshift(req.body[i]);
        }
      }
      favorite.user = req.user._id;
      favorite.save()
      .then((favorite)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      });
    }
  },(err)=> next(err))
  .catch((err) => next(err));
})


.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /favorites');
})


.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
  Favorite.remove({})
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
  },(err)=> next(err))
  .catch((err) => next(err));
});


// '/favorites/dishId' endpoint
favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions,(req,res)=>{
  res.sendStatus(200);
})


.get(cors.cors,authenticate.verifyUser,(req,res,next) =>{
  Favorite.findOne({ user: req.user._id })
  .then((favorite)=>{
    if(!favorite){
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      return res.json('No Favorites added');
    }
    else
    {
      if(favorite.dishes.indexOf(req.params.dishId) < 0)
      {
        err = new Error('dishID '+ req.params.dishId + ' not found in favorites');
        err.status = 404;
        return next(err);//app.js will handle error
      }
      else{ //dish exists in favorites
        Favorite.findById(favorite._id)
        .then((favorite) => {
         Dishes.findById(req.params.dishId)
        .then((dish)=>{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.json(dish);
        },(err)=> next(err))
        .catch((err) => next(err));
      },(err)=> next(err))
      .catch((err) => next(err));
    }
  }
},(err)=> next(err))
.catch((err) => next(err));
})


.post(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
  Favorite.findOne({ user: req.user._id })
  .then((favorite)=>{
    if(!favorite)
    {
      Favorite.create({
      user: req.user._id,
      dishes: req.params.dishId
      },(err,document)=>{
        if(document)
        {
          console.log('Document Created',document);
          res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					return res.json(document);
        }
        else{
          return next(err);
        }
      });
    }
    else{
        if(favorite.dishes.indexOf(req.params.dishId)<0)//if the dish to be added does not already exist as favorite
        {
          favorite.dishes.unshift(req.params.dishId);
          favorite.user = req.user._id;
          favorite.save()
          .then((favorite)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json(favorite);
          },(err)=> next(err))
          .catch((err) => next(err));
        }
        else{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.json('Dish ' + req.params.dishId + ' already present in favorites!')
        } 
    }
  },(err)=> next(err))
  .catch((err) => next(err));
})

.put(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /favorites/' + req.params.dishId);
})

.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favorite.findOne({ user: req.user._id })
  .then((favorite)=>{
    if (!favorite) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json('No Favorites Found!');
    }
    else if(favorite.dishes.indexOf(req.params.dishId)<0){
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json('DishID' + req.params.dishId + ' not found in your favorites!');
    }
    else{
      favorite.dishes.pull(req.params.dishId);
      favorite.save()
      .then((favorite)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        return res.json(favorite);
      },(err)=> next(err))
      .catch((err) => next(err));
    } 
  },(err)=> next(err))
  .catch((err) => next(err));
});


module.exports = favoriteRouter;




