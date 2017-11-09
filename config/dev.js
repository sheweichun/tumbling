const port = 9000 ;
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.dev.js');
const open = require('open');
const express = require('express');
const app = express();
let startFlag = false;
let host = `http://localhost:${port}${config.output.publicPath}`;
Object.keys(config.entry).forEach((item) => {
  config.entry[item].unshift('webpack-hot-middleware/client?reload=true');
});
host = `${host}simple/index.html`;
const compiler = webpack(config);
compiler.plugin('done', () => {
  if (startFlag) return;
  startFlag = true;
  console.log(`listening on ${host}....`);
  open(host, (err) => {
    if (err) { console.error(err); }
    // this.gather.hookRequire(this.checkPackageRequire.bind(this, config.resolve.alias));
  });
});

console.log('Enabling webpack dev middleware.');
console.log('Enabling Webpack Hot Module Replacement (HMR).');
app.use(express.static(path.resolve(__dirname,'../')));
app.use(require('webpack-dev-middleware')(compiler, {
  lazy: false,
  noInfo: true,
  publicPath: config.output.publicPath,
  quiet: false,
  stats: {
    colors: true,
  },
}));
app.use(require('webpack-hot-middleware')(compiler, {
  reload: true,
  noInfo: true,
  quiet: true,
}));

app.listen(port, () => {

});