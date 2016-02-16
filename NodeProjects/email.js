var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'usa.phpteam@gmail.com',
        pass: '$neebal9820'
    }
});


module.exports.sendMail = function(fromAddr, toAddr, subject, message){

	transporter.sendMail({
		from: 'usa.phpteam@gmail.com', // sender address
	    to: toAddr, // list of receivers
	    subject: subject, // Subject line
	    html: message // html body
	}, function(error, info){
		if(error){
			console.log(error);
		}
		else{
			console.log("Message Sent");
		}
	});
}

