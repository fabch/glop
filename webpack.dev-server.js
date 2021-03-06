var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

new WebpackDevServer(
    webpack(config),
    {
        publicPath: config.output.publicPath,
        hot: true,
        quiet: false,
        noInfo: false,
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000 // is this the same as specifying --watch-poll?
        }
    }
).listen(
    3000,
    '0.0.0.0',
    function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log('Listening at 0.0.0.0:3000');
    }
);