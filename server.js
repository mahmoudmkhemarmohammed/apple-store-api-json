const jsonServer = require('json-server');
const auth = require('json-server-auth');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(auth); // تفعيل json-server-auth
server.use(router); // تفعيل Router

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server with Auth is running on port ${port}`);
});