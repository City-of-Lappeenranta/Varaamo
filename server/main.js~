/* eslint-disable no-console */

import path from 'path';

import express from 'express';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import auth from './auth';
import webpackConfig from '../config/webpack.development';
import serverConfig from './config';
import render from './render';
import Keycloak from 'keycloak-js';
import axios from 'axios';

const app = express();
const compiler = webpack(webpackConfig);
const port = serverConfig.port;
const kc = Keycloak('./auth/keycloak.json');

if (serverConfig.isProduction) {
  console.log('Starting production server...');

  // Serve the static assets. We can cache them as they include hashes.
  app.use('/_assets', express.static(path.resolve(__dirname, '../dist'), { maxAge: '200d' }));
} else {
  console.log('Starting development server...');

  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: false,
    noInfo: false,
    stats: {
      assets: false,
      chunkModules: false,
      chunks: true,
      colors: true,
      hash: false,
      progress: false,
      timings: false,
      version: false,
    },
  }));

  app.use(webpackHotMiddleware(compiler));
}

// Request logging
app.use(morgan('combined'));

//app.use('/', auth);
kc.init({onLoad: 'check-sso'}).success(authenticated => {

if (authenticated) {

store.getState().keycloak = kc;

 

setInterval(() => {

kc.updateToken(10).error(() => kc.logout());

}, 10000);

 

ReactDOM.render(app, document.getElementById('app'));

 

 

} else {

// show possibly other page here…

 

 

kc.login();

}

});

axios.interceptors.request.use(config => {

config.headers = {

'Content-Type': 'application/json',

Accept: 'application/json',

Authorization: 'Bearer ' + kc.token

 

};

return config;

});
app.get('*', render);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else if (serverConfig.isProduction) {
    console.log(`Production server running on port ${port}`);
  } else {
    console.log(`Listening at http://localhost:${port}`);
  }
});
