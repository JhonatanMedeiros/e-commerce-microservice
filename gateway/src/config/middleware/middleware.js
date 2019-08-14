import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';

import config from '../env/index';
import HttpError from '../error';
import sendHttpErrorModule from '../error/sendHttpError';

function configure(app) {

  // express middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
  app.use(cookieParser());

  // returns the compression middleware
  app.use(compression());

  // helps you secure your Express apps by setting various HTTP headers
  app.use(helmet());

  // providing a Connect/Express middleware that can be used to enable CORS with various options
  app.use(cors());

  // setup the logger
  if (config.log) {
    app.use(morgan('dev'));
    app.use(morgan('combined', { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }));
  }

  // custom errors
  app.use(sendHttpErrorModule);

  // cors
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With,' +
      ' Content-Type, Accept,' +
      ' Authorization,' +
      ' Access-Control-Allow-Credentials'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
}

function initErrorHandler(app) {
  app.use((error, req, res, next) => {
    if (typeof error === 'number') {
      error = new HttpError(error); // next(404)
    }

    if (error instanceof HttpError) {
      res.sendHttpError(error);
    } else {
      if (app.get('env') === 'development') {
        error = new HttpError(500, error.message);
        res.sendHttpError(error);
      } else {
        error = new HttpError(500);
        res.sendHttpError(error, error.message);
      }
    }
    next();
  });
}

export default {
  configure,
  initErrorHandler
}
