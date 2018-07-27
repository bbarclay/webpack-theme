const path = require('path');
const config = require('./config.js');

// Including our UglifyJS
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Our new plugin
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "../assets/[name].min.css",
    allChunks: true,

});


const webpack = require('webpack');



module.exports = {
  entry: './development/js/app.js',
  plugins: [
  		new UglifyJSPlugin(),
  		extractSass,
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
      }),
      new BrowserSyncPlugin({
            proxy: config.url,
            files: [
              '**/*.php'
            ],
            reloadDelay: 0
      }),
      //new webpack.HotModuleReplacementPlugin(),
      //new webpack.NameModulesPlugin()
  ],
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'assets/')
  },
  module : {

  	rules: [
  		{
  			test: /\.js$/,
  			exclude: /(node_modules|bower_components)/,
  			use: {
  				loader: 'babel-loader',
  				options: {
  					presets: ['babel-preset-env']
  				}
  			}
  		},
  		 {
  			test: /\.scss$/,
			  use: extractSass.extract({
			      use: [{
			          loader: "css-loader",
			          options: {
			            minimize: true,
			          }
			      }, {
			          loader: "sass-loader"
			      }],
			      // use style-loader in development
			      fallback: "style-loader"
			  })
  		},
  		{
  			test: /\.css$/,
  			loader: 'style-loader',
  		},
  		{
  			test: /\.css$/,
  			loader: 'css-loader',
  			options: {
  				minimize: true
  			}
  		},
  		{
          test: /\.(png|jpe?g|gif|svg)$/,
          exclude: /node_modules/,
          use: [{
              loader: 'url-loader',
              //loader: 'file-loader',
              options: { 
                  limit: 10000, // Convert images < 8kb to base64 strings
                  name: '[hash]-[name].[ext]',
                  outputPath: 'images/'
              } 
          }]
      },
      {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: [{
                //loader: 'file?name=[name].[ext]',
                loader: 'file-loader?limit=100000',
                options: {
                    limit: 10000, // Convert images < 8kb to base64 strings
                    name: '[hash]-[name].[ext]',
                    outputPath: 'fonts/'
                }
            }]
      }

  	]
  },
  devServer: {
        contentBase: path.join(__dirname, "assets"),
        //historyApiFallback: true,
        compress: true,
        //port: 9000,
        stats: "errors-only",
        open: true,
        https: config.url.indexOf('https') > -1 ? true : false,
        publicPath: config.fullPath,
        proxy: {
            '*': {
                'target': config.url,
                'secure': false
            },
            '/': {
                target: config.url,
                secure: false
            }
        },
  },
  resolve: {
		alias: {
	        'slick': 'slick-carousel/slick/slick.min',
          'Utilities': path.resolve(__dirname, 'src/js/'),

	    }
  }

};
