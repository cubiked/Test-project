const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//importing the dishRouter code (remember './' is used when calling a file based node module)
const dishRouter = require('./routes/dishRouter');
const hostname = 'localhost';
const port = 3000;

//the below const is saying that the application is going to be using the express node module.  Express then provides methods we can use to construct our webserver.
const app = express();
//.use is needed whenever you want to use a middleware module
app.use(morgan('dev'));
app.use(bodyParser.json());


//here's where we mount the router at the specific endpoint, therefore the first parameter is the endpoint then the second parameter is the router
app.use('/dishes', dishRouter);


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