import express from 'express';
import httpProxy from 'express-http-proxy';

import proxyConfig from './proxy-config';

const router = express.Router();

for (let key in proxyConfig.serviceEndpoints) {
  const { url } = proxyConfig.serviceEndpoints[key];
  const path = `/${key}`;
  router.use(path, httpProxy(url))
}

export default router;
