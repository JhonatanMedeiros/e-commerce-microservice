import express from 'express';
import httpProxy from 'express-http-proxy';
import http from 'http';

function init(app) {
  const router = express.Router();

  const productsServiceProxy = httpProxy('http://localhost:3001');

  app.get('/products', (req, res, next) => productsServiceProxy(req, res, next));

  app.get('/ping', (req, res) => res.json({
    msg: 'pong!',
    version: process.env.npm_package_version
  }));

  app.use((req, res, next) => res.status(404).send(http.STATUS_CODES[404]));

  app.use(router);
}

module.exports = { init };
