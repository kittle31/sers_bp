const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/app/index.js",
  mode: "development",
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-2', 'stage-3']
         }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: {
           loader: 'file-loader'
         }
      }
    ],

  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [
      path.resolve('./src/app'),
      path.resolve('./test/app')
    ]

 },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/sers-api/*': {
        //route ui dev-server which is on 8080 requests to the 9090 where backend server runs
        target: 'http://192.168.1.132:8080',
        secure: false
      }
    }
  }
};
