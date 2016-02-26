const jsonServer = require('json-server');

const port = process.env.PORT || 3000;
const server = jsonServer.create();
const router = jsonServer.router('db.json');

server.use(jsonServer.defaults({ static: 'build' }));
server.use('/api', router);
server.listen(port, () => {
  console.log()
});
server.on('error', handleError);
server.on('listening', handleListening);

function handleError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
  case 'EACCES':
    console.log(`${bind} requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.log(`${bind} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  }
}

function handleListening() {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
  console.log(`Listening on ${bind}`);
}
