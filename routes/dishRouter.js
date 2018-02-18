//This file will contain the implementation of the handling of the rest API of /dishes and /dishes/:dishId
//express router comes with node so we don't need to download another node module
//since this is a mini application we still need to require express, as once you define a new file it becomes 
//its own node module, which can then be imported in index.js
const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

//express router supports the .route method which can take in an endpoint as a parameter
//The '/' relates to the fact that we're mounting the router of dishes at the '/' in the URI, the mounting takes place in the index.js file.
dishRouter.route('/')
//by using this approach we are declaring the endpoint at one single location thereby you can chain all of the GET, POST, DELETE methods to that single location (without having to call it with every function handling those methods).
//previously we had used app.all, but because we are chaining these functions to the route, app is not a const, and is not needed, and neither is the endpoint we had initially had defined 
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you');
})
.post((req,res,next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description)
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes')
})
.delete((req,res,next) => {
    res.end('Deleting all of the dishes!');
});
//note: that when you chain these methods, only the last needs a semi colon.

//The dishRouter chained function will only callable within side this node module unless we allow it to be exported:

module.exports = dishRouter;  