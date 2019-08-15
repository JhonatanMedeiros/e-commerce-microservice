import proxyConfig from '../proxy/proxy-config';

class AdminController {

  async index(req, res) {
    res.json(proxyConfig.serviceEndpoints);
  }

  async store(req, res) {
    let isUpdate;
    let body = req.body;
    await proxyConfig.updateConfig(json => {
      json.serviceEndpoints = json.serviceEndpoints || {};
      isUpdate = body.name in json.serviceEndpoints;
      json.serviceEndpoints[body.name] = body;
      return json;
    });

    res.json(body);
    res.status(isUpdate ? 204 : 201);
  }

  async find(req, res) {
    const { name } = req.params;
    const entity = proxyConfig.serviceEndpoints[name];
    if (!entity) {
      return res
        .status(404)
        .json({ message: `Not exist endpoint ${name}` });
    }
    return res.json(entity);
  }

  async update(req, res) {
    let isUpdate;
    let body = req.body;
    const { name } = req.params;

    await proxyConfig.updateConfig(json => {
      json.serviceEndpoints = json.serviceEndpoints || {};
      isUpdate = name in json.serviceEndpoints;
      json.serviceEndpoints[name] = body;
      return json;
    });

    res.json(body);
    res.status(isUpdate ? 204 : 201);
  }

  async delete(req, res) {
    const { name } = req.params;
    if (!proxyConfig.serviceEndpoints[name]) {
      return res
        .status(404)
        .json({ message: `Not exist endpoint ${name}` });
    }
    await proxyConfig.updateConfig(json => {
      json.serviceEndpoints = json.serviceEndpoints || {};
      delete json.serviceEndpoints[name];
      return json;
    });
    return res.status(204);
  }
}

export default new AdminController();
