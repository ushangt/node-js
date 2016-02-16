var db 	=	require('./db');


exports.get = function(req, res)
{
	console.log("Print query params : "+req.query);
	db.menu.find(req.query).sort("name").exec(function(err, data){

		if(err)
			res.json({error:err});
		else
			res.json(data);
	});
}

exports.post = function(req, res)
{
	var menu = new db.menu();
	menu.name = req.body.name;
	menu.cost = req.body.cost;
	menu.save();
	res.json(menu);
}