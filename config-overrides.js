/* eslint-disable no-param-reassign */
const webpack = require(`webpack`);

module.exports = function override(config) {
  if (!config.plugins) {
    config.plugins = [];
  }
  if (process.env.NODE_ENV === `production`) {
    config.plugins.push(
      new webpack.DefinePlugin({ HOST_URL: JSON.stringify(`https://`) })
    );
    config.plugins.push(
      new webpack.DefinePlugin({
        BASE_URL: JSON.stringify(``),
      })
    );
  } else {
    config.plugins.push(
      new webpack.DefinePlugin({
        HOST_URL: JSON.stringify(`http://localhost:3001`),
      })
    );
    config.plugins.push(
      new webpack.DefinePlugin({
        BASE_URL: JSON.stringify(`http://localhost:3011/api`),
      })
    );
  }
  return config;
};
