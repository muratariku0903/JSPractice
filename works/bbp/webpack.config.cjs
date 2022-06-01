const path = require('path');

module.exports = {
    mode: 'development',
    entry: { bundle: './src/scripts/app.ts' },
    output: {
        path: path.join(__dirname, 'assets/scripts'),
        filename: 'bundle.js'
    },
    resolve: { extensions: ['.ts', '.js'] },
    devServer: {
        static: { directory: path.join(__dirname, "") }
    },
    module: {
        rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
    }
}
