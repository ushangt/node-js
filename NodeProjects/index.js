var express 			=	require('express');		//	Require or include the express framework in the project
var server				=	express() ;				//	make the server use express in the application
var bodyParser 			=	require('body-parser');	//	for parsing json requests
var multer 				=	require('multer');		//	Used for multipart requests (Form upload etc)
var expressValidator	=	require('express-validator'); // Includes the express validator library to the project
var hat 				= 	require('hat');				//	Include hat for generating random ids
var underscore			=	require('underscore');
var email	 			= 	require('./email');
var scoreArray 			= 	{};

server.use(bodyParser.json()); 								// for parsing application/json
server.use(expressValidator());								// use validations
server.use(bodyParser.urlencoded({ extended: true })); 		// for parsing application/x-www-form-urlencoded
server.use(multer()); 										// for parsing multipart/form-data

server.use(function(req, res, next) {						//Logs each request to the console

	console.log(req.method, req.url, req.body);
	next();													//WITHOUT THIS the request wont be forwarded to the approriate method.
});

server.get('/', function(req, res){
	res.send("<h1> Hello. First Node JS Lecture. Intresting :) </h1>");

});

server.route('/score')
.get(function(req,res){
	res.json({list:scoreArray});	
})
.post(function(req,res){
	req.assert('team' , 'Valid score required').notEmpty().isAlpha();
	req.assert('runs' , 'Valid score required').notEmpty().isInt();
	req.assert('wickets' , 'Valid score required').notEmpty().isInt();
	req.assert('overs' , 'Valid score required').notEmpty().isFloat();
	var errors = req.validationErrors();
	if(errors)
	{
		res.status(500);
		res.send({error : errors});
		return;
	}
	var score 		= 	{};
	var id 			=	hat();
	score.team 		= 	req.body.team;
	score.runs 		= 	req.body.runs;
	score.wickets 	= 	req.body.wickets;
	score.overs 	= 	req.body.overs;
	score.id 		=	id;
	scoreArray[id]	=	score;
	email.sendMail('usa.phpteam@gmail.com','shweta.neebalit@gmail.com','Somebody loves you Part 2 ','Mehul Sir ??????? <3');
	res.json(score);
})
.put(function(req,res){
	var id 	=	req.query.id;
	scoreArray[id].team 		=	req.body.team;
	scoreArray[id].runs 		=	req.body.runs;
	scoreArray[id].wickets 		=	req.body.wickets;
	scoreArray[id].overs 		=	req.body.overs;
	res.json(scoreArray[id]);
});



server.delete('/score', function(req, res){
	res.send("This is a delete request");
});

server.listen(5555);
