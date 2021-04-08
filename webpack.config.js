const webpack = require( 'webpack' );

const plugins = [
    new webpack.NoEmitOnErrorsPlugin()
];

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: __dirname,
        filename: '[name].js',
        publicPath: '/',
        library: [ 'sham-ui-unsafe', 'sham-ui-unsafe/[name]' ],
        libraryTarget: 'umd'
    },
    externals: [
        'sham-ui'
    ],
    plugins: plugins,
    module: {
        rules: [ {
            test: /(\.js)$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            include: __dirname
        } ]
    }
};
