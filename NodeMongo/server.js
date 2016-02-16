var express 			=	require('express');		//	Require or include the express framework in the project
var server				=	express() ;				//	make the server use express in the application
var router 				=	require('./approuter');
var bodyParser 			=	require('body-parser');	//	for parsing json requests
var multer 				=	require('multer');		//	Used for multipart requests (Form upload etc)
var expressValidator	=	require('express-validator'); // Includes the express validator library to the project
var mongoose 			= 	require('mongoose');			//Include Mongoose for managing mongo db


mongoose.connect('mongodb://localhost/restaurant');

server.use(bodyParser.json()); 								// for parsing application/json
server.use(expressValidator());								// use validations
server.use(bodyParser.urlencoded({ extended: true })); 		// for parsing application/x-www-form-urlencoded
server.use(multer()); 										// for parsing multipart/form-data

server.use(function(req, res, next) {						//Logs each request to the console
	console.log(req.method, req.url, req.body);
	next();													//WITHOUT THIS the request wont be forwarded to the approriate method.
});

server.use('/',router);

server.listen(5000);