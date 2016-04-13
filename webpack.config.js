var path = require('path');
var webpack = require('webpack');

var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
    node: {
        fs: "empty"
    },
    resolve: {
        modulesDirectories: [ "node_modules", "bower_components"]
    },
    entry: [
        'webpack-dev-server/client?http://192.168.56.102:3000',
        'webpack/hot/only-dev-server',
        './app/Resources/js/app'
    ],
    output: {
        path: path.join(__dirname, 'web/dist'),
        filename: 'bundle.js',
        publicPath: 'http://192.168.56.102:3000/static/'
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        ),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],
    module: {
        loaders: [
            {
                test: /[\\\/]bower_components[\\\/]modernizr[\\\/]dist[\\\/]modernizr-build\.js$/,
                loader: "imports?this=>window!exports?window.Modernizr"
            },
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'app/Resources/js'),
                loaders: ['react-hot','babel?presets[]=react,presets[]=es2015']
            },
            {
                test: /\.(ico|jpe?g|png|gif)$/,
                loaders: [
                    "file?name=[path][name].[ext]&context=./src"
                ]
            },
            {
                test: /\.(woff|ttf|otf|eot\?#.+|svg#.+)$/,
                loaders: [
                    "file?name=[path][name].[ext]&context=./src"
                ]
            }
        ]
    }
};

module.exports = config;