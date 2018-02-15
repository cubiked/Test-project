const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

//the below const is saying that the application is going to be using the express node module.  Express then provides methods we can use to construct our webserver.
const app = express();
//.use is needed whenever you want to use a middleware module
app.use(morgan('dev'));
app.use(bodyParser.json());

// when a request comes in using app.all means all of the requests no matter which method is used the code below is used first.
app.all('/dishes', (req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    //when you call next, it means it will look on for the next specific function that uses the /dishes endpoint.
    next();
});

//the modified object (res) is passed on to this function because we're using '/dishes' by the next callback 
//the next parameter below is not going to be used in this function because we are not going to call anything further down as evident by using 'res.end'
app.get('/dishes', (req,res,next) => {
    res.end('Will send all the dishes to you');
});

//because of the next, the app.all function will run first and this code below will only run if someone uses a POST request
//to extract the information from the body, the body parser defined above will already put the parsed body into the req.body object.
app.post('/dishes', (req,res,next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description)
});

//a put on the dishes endpoint doesn't make sense
app.put('/dishes', (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes')
});

// Only privilaged users should be allowed to do this
app.delete('/dishes', (req,res,next) => {
    res.end('Deleting all of the dishes!');
});


// The below CRUD operations are for when someone wants to amend a specific dish (see routes with parameters in notes)
app.get('/dishes/:dishId', (req,res,next) => {
    // The details of the dish is defined in the parameter of the route, therefore we can get that parameter using req.params.dishId. The parameter defined in the route (dishId) needs to match req.params.<dishId>. The name dishId doesn't mean anything they just need to match.
    res.end('Will send details of the dish: '+ req.params.dishId + ' to you!');
}); 

//You are not going to create a specific dish (as it relates to ones already there), therefore we state this.
app.post('/dishes/:dishId', (req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req,res,next) => {
    //res.write can be used to add a line to the reply message. (the '\n' adds a new line)
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    //Since this is a PUT operation and if the body contains the JSON string which contains the details of the dish, we can extract the details of the dish because we are using the body parser (using req.body.name as the body (in this example?) contains a name parameter).
    res.end('Will update the dish '+ req.body.name + ' with details: '+ req.body.description);
});

app.delete('/dishes/:dishId', (req,res,next) => {
    res.end('Deleting dish: '+ req.params.dishId);
});


//The below __dirname method is telling express to look at the static file in the /public file.
app.use(express.static(__dirname+ '/public'));

//next is used when you need to invoke additional middleware to take care of work on your behalf. In the function below next is an optional parameter.
app.use((req,res,next) => {
    // console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express server</h1></body></html>')
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});