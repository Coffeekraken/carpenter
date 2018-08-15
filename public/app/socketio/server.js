const expressApp = require('express')
const server = require('http').Server(expressApp)
const io = require('socket.io')(server)
const config = require('../config')

setTimeout(() => {
	const port = config.port + 1
	server.listen(port, function(){
		console.log(`Carpenter : socket listening on port ${port}`);
	});
}, 100);

module.exports = io
