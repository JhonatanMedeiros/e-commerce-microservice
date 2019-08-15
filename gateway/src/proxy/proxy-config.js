import yamlOrJson from 'js-yaml';
import * as chokidar from 'chokidar';
import Ajv from 'ajv';
import path from 'path';
import fs from 'fs';
import util from 'util';

import gatewaySchema from '../config/schemas/gateway.config';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class ProxyConfig {

  constructor() {
    this.config = {
      gatewayConfigPath: path.resolve(__dirname, 'gateway.config.yml')
    };

    this.initializeConfig();
  }

  initializeConfig() {
    this.loadConfig();
    this.watchConfig();
  };

  loadConfig() {
    try {
      const config = yamlOrJson.safeLoad(fs.readFileSync(this.config.gatewayConfigPath, 'utf8'));

      const { valid, errors } = this.validate(config);

      if (!valid) {
        throw new Error(JSON.stringify(errors));
      }

      console.log('[loadConfig]', config);

      this.serviceEndpoints = config.serviceEndpoints;

    } catch (e) {
      throw new Error(e);
    }
  };

  watchConfig() {
    const watchEvents = ['add', 'change'];

    const watchOptions = {
      awaitWriteFinish: true,
      ignoreInitial: true
    };

    this.watcher = chokidar.watch(this.config.gatewayConfigPath, watchOptions);

    watchEvents.forEach(watchEvent => {
      this.watcher.on(watchEvent, name => {
        try {
          this.loadConfig();
        } catch (e) {
          console.log('[WATCH CONFIG]', e);
        }
      });
    });
  };

  unwatchConfig() {
    this.watcher && this.watcher.close();
  };

  async updateConfig(modifier) {
    console.log('[UPDATE -------------]');

    try {
      const data = await readFile(this.config.gatewayConfigPath, 'utf8');
      const json = yamlOrJson.load(data);
      const result = modifier(json);
      const text = yamlOrJson.dump(result);
      const candidateConfiguration = yamlOrJson.load(this.envReplace(String(text), process.env));

      console.log(candidateConfiguration);

      const { valid, errors } = this.validate(candidateConfiguration);

      if (!valid) {
        const e = new Error(JSON.stringify(errors));
        e.code = 'INVALID_CONFIG';
        throw e;
      }

      await writeFile(this.config.gatewayConfigPath, text);

    } catch (e) {
      console.log(e);
    }
  }

  validate(config) {
    const ajv = new Ajv();
    const validate = ajv.compile(gatewaySchema);
    const valid = validate(config);
    return {
      errors: validate.errors,
      valid
    }

  }

  envReplace(str, vars) {
    return str.replace(/\$?\$\{([A-Za-z0-9_]+)(:-(.*?))?\}/g, function (varStr, varName, _, defValue) {
      // Handle escaping:
      if (varStr.indexOf('$$') === 0) {
        return varStr;
      }
      // Handle simple variable replacement:
      if (vars.hasOwnProperty(varName)) {
        console.log(`${varName} replaced in configuration file`);
        return vars[varName];
      }
      // Handle default values:
      if (defValue) {
        console.log(`${varName} replaced with default value in configuration file`);
        return defValue;
      }
      console.log(`Unknown variable: ${varName}. Returning null.`);
      return null;
    });
  };

}

export default new ProxyConfig();
