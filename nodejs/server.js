const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

// CORS pour permettre les requêtes depuis React
server.use(cors());
server.use(middlewares);

// Routes personnalisées (optionnel)
server.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes json-server
server.use(router);

server.listen(PORT, () => {
  console.log(`🚀 JSON Server is running on port ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
});

