const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const webpackConfig = require('../webpack.config');
const connectDB = require('./config/db');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    helmet({
        contentSecurityPolicy: false,
        frameguard: true
    })
);
app.use(cors());

// Connect to MongoDB
connectDB();

// if development
if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(webpackConfig);
  
    app.use(
        historyApiFallback({
            verbose: false
        })
    );
  
    app.use(
        webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
            contentBase: path.resolve(__dirname, '../client/public'),
            stats: {
                colors: true,
                hash: false,
                timings: true,
                chunks: false,
                chunkModules: false,
                modules: false
            }
        })
    );
  
    app.use(webpackHotMiddleware(compiler));
    app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
    app.use(compression());
    app.use(express.static(path.resolve(__dirname, '../dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    });
}

module.exports = app
