var express = 	require('express');
var router 	= 	express.Router(); 	// Use the express router module
var menu 	=	require('./menu');
var order 	=	require('./order');

router.get('/menu', menu.get);

router.post('/menu', menu.post);

router.post('/order',order.post);

module.exports = router;	//Export it so that it can be included or called from some other file !!