var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.options('*',cors.corsWithOptions,(req,res)=>{
  res.sendStatus(200);
});
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
  User.find(function (err, user) {
    if(err) {
      return next(err);
    }
    res.json(user);
});
});

router.post('/signup', cors.corsWithOptions,(req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if(req.body.firstname){
        user.firstname = req.body.firstname;
      }
      if(req.body.lastname){
        user.lastname = req.body.lastname;
      }
      user.save((err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});

router.post('/login', cors.corsWithOptions,  (req, res,next) => {
  passport.authenticate('local',(err,user,info)=>{ //info - when user does not exist or incorrect details ,  err -  error in authenticate process
    if(err){
      return next(err);
    }
    if(!user){
      res.statusCode = 401
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false,  status: 'Login unsuccessful!',err : info });
    }
    req.logIn(user,(err)=>{
      if(err){
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false,  status: 'Login unsuccessful!',err : 'Could not login user' });
      }
        var token = authenticate.getToken({_id: req.user._id});
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true,  status: 'Login Successful!',token: token });
    }) ;
  }) (req,res,next); 
});

router.get('/logout',(req,res)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err = new Error('You are not logged in!');
    err.status=403;
    next(err);

  }
});

router.get('/facebook/token', passport.authenticate('facebook-token'),(req,res)=>{
  if(req.user){
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true,token: token, status: 'You are successfully logged in!'});  
  }
})

router.get('/checkJWTToken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return next(err);
    
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});

    }
  }) (req, res);
});
module.exports = router;

  /* //-----without passport
  if(!req.session.user){ //express session
    var authHeader = req.headers.authorization;
    if(!authHeader)
    {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate','Basic');
      err.status = 401;
      return next(err);
    }
  //while authenticating - the first part of every encoded string wil be "Basic" and space " " followed by "username:password"
  //EG: Basic username:password
  //Here we are splitting Basic from the username and password string and extracting second [1] that is concatenated username and password
  //then again splitting the username and password which are separated by ":"
  //so, auth will be an array containing username and password
  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

  var username = auth[0];
  var password = auth[1];

  User.findOne({username: username})
  .then((user)=>{
    if(user==null){
      var err = new Error('User '+username + ' does not exist');
      err.status = 403;
      return next(err);
    }
    else if(user.password != password){
      var err = new Error('Your password is incorrect ');
      err.status = 403;
      return next(err);
    }
    if(user.username==username && user.password == password){
        req.session.user = 'authenticated';
        res.statusCode=200;
        res.setHeader('Content-Type','text/plain');
        res.end('You are authenticated!');
      // res.cookie('user','admin',{ signed: true}); //cookies
        //next();//from auth request will pass on to next midlleware 
      }
    })
    .catch((err)=>next(err));
  }

  else{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    res.end('You are already authenticated!');
  }
  */

