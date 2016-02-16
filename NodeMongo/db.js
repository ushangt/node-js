var mongoose 	= 	require('mongoose');
var Schema 		=	mongoose.Schema;

var menuSchema	=	new Schema({
	name: String,
	cost: Number,
	created:{
		type: Date,
		default: Date.now
	}
},
{
	toObjects: {
		virtuals: true				//Enables virtuals for menuSchems objects outputs
	},
	toJSON: {
		virtuals: true				//Enables virtuals for menuSchema JSON outputs
	},
	id: false						//To not get duplicate id on using virtuaks
});


menuSchema.virtual('virtual').get(function() {
	return this.name + ' will cost you ' + this.cost;
});


var orderSchema	=	new Schema({
	customer: String,
	table: String,
	menu_item: [Schema.Types.Mixed],
	total_cost: Number,
	offer: {
		type: Boolean,
		default: false
	}
});

orderSchema.pre('save', function(next) {

	if(this.total_cost > 100)
		this.offer = true;

	next();
});

//export
exports.menu  = mongoose.model('menu', menuSchema);
exports.order = mongoose.model('order', orderSchema);

