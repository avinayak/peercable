var express = require('express');
var shortid = require('shortid');

var app = express();
app.set('view engine', 'pug');
app.use(express.static('static'));

var io = require('socket.io').listen(app.listen(process.env.PORT || 5000,function() {
	console.log('Node app is running on port', process.env.PORT || 5000);
}));
var sessions = {};

app.get('/', function (request, response) {
	var netid = shortid.generate();
	sessions[netid]=[];
	response.redirect("/"+netid);
});

app.get('/:netid',function (request, response) {
	var peerid = shortid.generate();
	if(sessions[request.params.netid])
	sessions[request.params.netid].push( { peer:peerid } );
	response.render("index",{
		connections:'\'X\'',
		session_id:request.params.netid,
		self_id:peerid,
	});
});

io.on('connection', function (socket) {
  // console.log('connected');
  // socket.emit('news', { hello: 'world' });
  socket.on('hola', function (data) {
    sessions[data.data.session_id].forEach(function(peer) {
    	console.log(peer)
    	if(peer.peer==data.data.self_id)
    		peer.sock=socket;
    })
    console.log(sessions)
  });
});

