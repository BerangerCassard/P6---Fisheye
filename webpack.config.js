const path = require('path');
const CopyPlugin  = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index:'./src/index.ts',
        model:'./src/domain/model.class.ts',
        photographer: './src/photographer.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: '**/*.html', to: '', context: "src/" },
                { from: 'assets', to: 'assets', context: "src/" },
            ]
        })
    ],
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
};
