/**
 * @param  {NodeJS.ErrnoException} error
 * @param  {number|string|boolean} port
 * @returns throw error
 */
function onError(error, port) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.log('\x1b[31m', `API :: ${bind} requires elevated privileges`, '\x1b[0m');
      process.env.NODE_ENV !== 'test' ? process.exit(1) : null;

      break;
    case 'EADDRINUSE':
      console.log('\x1b[31m', `API :: ${bind} is already in use`, '\x1b[0m');
      process.env.NODE_ENV !== 'test' ? process.exit(1) : null;

      break;
    default:
      throw error;
  }
}

/**
 * @export onListening
 */
function onListening() {
  const addr = this.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

  console.log('\x1b[32m', `API :: Listening on ${bind}`, '\x1b[0m');
}

function onClose() {
  console.log('\x1b[32m', 'API :: On Close', '\x1b[0m');
}

module.exports = {
  onError,
  onListening,
  onClose
};
