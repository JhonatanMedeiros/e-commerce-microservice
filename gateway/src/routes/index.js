import http from 'http';

import proxy from '../proxy';
import admin from '../admin';

function init(app) {

  app.use(proxy);

  app.use('/admin', admin);

  app.get('/ping', (req, res) => res.json({
    msg: 'pong!',
    version: process.env.npm_package_version
  }));

  app.use((req, res, next) => res.status(404).send(http.STATUS_CODES[404]));
}

export default { init };
