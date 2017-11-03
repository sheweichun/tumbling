const path = require('path');
module.exports = {
  packName: 'webpack',
  packScope: '@ali',
  packOption: {
    dll: {
      production:false
    },
    modules: false,
    happypack: true,
    common:"vendor",
    less: true,
    sass: false,
    config: {
      pages:'demos',
      dllVendor: 'vendor',
      babel: {
        babelrc: false,
        presets: [['es2015', { modules: false }], 'stage-0'],
        plugins: [
          'transform-decorators-legacy',
          ["inferno", {
              "imports": true,
              "pragma": ""
          }]
        ],
      },
      babelDev:{},
      contentBase: [
        {
          name: '',
          path: path.resolve(__dirname, '')
        }
      ]
    }
  },
  plugins: []
};


