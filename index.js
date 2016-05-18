var express = require('express');
var app = express();
var counter = 1;

app.set('port', (process.env.PORT || 5000));
app.use(express.static('static'));

app.get('/', function(request, response) {
	counter +=1
	response.send('you are visitor no. '+counter);
});

app.listen(app.get('port'), function() {

	console.log('Node app is running on port', app.get('port'));
});
