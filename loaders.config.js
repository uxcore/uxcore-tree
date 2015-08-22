module.exports = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
    },
    {
        test: /\.js?$/,
        // exclude: /node_modules/,
        loader: 'babel'
    },
    {
        test: /\.less$/,
        loader: 'style!css!less'
    },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader:   'url?limit=10000&minetype=image/svg+xml'
    }
];
