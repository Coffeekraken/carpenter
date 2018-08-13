const expressApp = require('express')
const server = require('http').Server(expressApp)
const io = require('socket.io')(server)

server.listen(3334, function(){
	console.log('Carpenter : socket listening on port 3334');
});

module.exports = io
