const http = require('http');
const serverHandlers = require('./config/server/serverHandlers');
const server = require('./config/server/server');

const Server = http.createServer(server);

/**
 * Binds and listens for connections on the specified host
 */
Server.listen(server.get('port'));

/**
 * Server Events
 */
Server.on('error', (error) => serverHandlers.onError(error, server.get('port')));
Server.on('listening', serverHandlers.onListening.bind(Server));
Server.on('close', () => serverHandlers.onClose());

module.exports = Server;
