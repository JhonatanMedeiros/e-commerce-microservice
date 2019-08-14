import http from 'http';
import serverHandlers from './config/server/serverHandlers';
import server from './config/server/server';

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
