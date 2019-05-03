var express = require('express');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;
	
	app.use('/public',express.static(__dirname + '/public'));
	
	app.get('/', function(req,res){
		
		return res.redirect('/public/index.html');
	});
	
	app.listen(port, function(){
		console.log('App working on port' + port );
	});
	
	app.get('/music',function(req,res){
		var fileId = req.query.id;
		var file = __dirname + '/music/' + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	
	});
	});


app.get('/download', function(req,res){
	var fileId = req.query.id;
	var file = __dirname + '/music/' + fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3')
			var rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send("Its a 404");
			res.end();
		}
	});
});


