const path = require('path');
const nodeExternals = require('webpack-node-externals');

const frontend = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/renderer.ts',
    output: { path: path.resolve(__dirname, 'dist'), filename: 'renderer.js' },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};

const backend = (file) => ({
    mode: 'development',
    entry: `./src/${file}.ts`,
    output: { path: path.resolve(__dirname, 'dist'), filename: `${file}.js` },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'node',
    externals: [nodeExternals()],
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.json'
                }
            }
        ]
    }
});

module.exports = [frontend, backend('main'), backend('preload')];
