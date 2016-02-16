var db			=	require('./db');
var underscore	=	require('underscore');	
var async 		=	require('async');

exports.post = function(req, res)
{
	var order = new db.order();
	order.customer = req.body.customer;
	order.table = req.body.table;
	var totalCost = 0;

	async.each(req.body.menu_item, function(menu_item_id, cb){

		db.menu.findById(menu_item_id).exec(function(err, menu){
			if(err)
			{
				console.log(err);
				return;
			}

			if(null == menu)
			{
				cb();
				return;
			}
			totalCost += menu.cost;
			order.menu_item.push(menu);
			console.log("found and now insert");
			cb();

		});
	}, function(err){

		if(err)
		{
			console.log(err);
			res.send("error while processing order");
			return;
		}
		else
		{
			order.total_cost = totalCost;
			order.save(function(err,updatedOrder){
				if(err)
					res.send("error while processing order");
				else
					res.json(updatedOrder);
			});
			//res.json(order);
		}
	});

}

