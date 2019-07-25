const express = require('express');
  const httpProxy = require('express-http-proxy');
const http = require('http');

/**
 * @export
 * @param {express.Application} app
 */
function init(app) {
  const router = express.Router();

  const productsServiceProxy = httpProxy('http://localhost:3001');

  app.get('/products', (req, res, next) => productsServiceProxy(req, res, next));

  app.get('/ping', (req, res) => res.json({
    msg: 'pong!',
    version: process.env.npm_package_version
  }));

  /**
   * @description No results returned mean the object is not found
   * @constructs
   */
  app.use((req, res, next) => {
    res.status(404).send(http.STATUS_CODES[404]);
  });

  /**
   * @constructs all routes
   */
  app.use(router);
}

module.exports = { init };
