const path = require('path');

module.exports = {
  chainWebpack: config => {
    // SVG SPRITE
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });
  },
  devServer: {
    disableHostCheck: true
  }
};

function resolve(dir) {
  return path.join(__dirname, './', dir);
}
