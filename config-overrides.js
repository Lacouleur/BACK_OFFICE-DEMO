/* eslint-disable no-param-reassign */
const webpack = require(`webpack`);

module.exports = function override(config) {
  if (!config.plugins) {
    config.plugins = [];
  }
  config.plugins.push(
    new webpack.DefinePlugin({
      HOST_URL: JSON.stringify(process.env.HOST_URL||'http://localhost:3001'),
    })
  );
  config.plugins.push(
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify(process.env.BASE_URL||'http://localhost:3011/api'),
    })
  );
  return config;
};
