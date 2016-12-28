var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ENV = process.env.ENV || 'dev';

var metadata = {
  ENV: ENV
};

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

module.exports = {
  entry: [
    path.normalize('es6-shim/es6-shim.min'),
    'reflect-metadata',
    path.normalize('zone.js/dist/long-stack-trace-zone'),
    path.resolve('app/app.ts')
  ],
  output: {
    path: path.resolve('www/build/js'),
    filename: 'app.bundle.js',
    pathinfo: false // show module paths in the bundle, handy for debugging
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript',
        query: {
          doTypeCheck: true,
          resolveGlobs: false,
          externals: ["typings/index.d.ts"]
        },
        include: path.resolve('app'),
        exclude: /node_modules/
      }
    ],
    noParse: [
      /es6-shim/,
      /reflect-metadata/,
      /zone\.js(\/|\\)dist(\/|\\)long-stack-trace-zone/
    ]
  },
  resolve: {
    alias: {
      '@angular': path.resolve('node_modules/@angular')
    },
    extensions: ['', '.js', '.ts']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'APP_CONFIG': JSON.stringify(readAppConfig(ENV))
      }
    })
  ]
};

function readAppConfig(env) {
  var baseConfig = fs.readFileSync('./config/config.json', 'utf8');

  var extendConfig = null;
  var extendConfigFileName = `./config/config.${env}.json`;
  try {
    extendConfig = fs.readFileSync(extendConfigFileName, 'utf8');
  } catch (e) {
    console.warn(`unable to read ${extendConfigFileName}`, e);
  }

  var finalConfig = Object.assign(JSON.parse(baseConfig), JSON.parse(extendConfig));

  console.log('baseConfig', baseConfig);
  console.log('extendConfig', extendConfig);
  console.log('finalConfig', finalConfig);

  return finalConfig;
}
