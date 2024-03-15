module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.REACT_APP_SERVER_URL': JSON.stringify(process.env.REACT_APP_SERVER_URL),
            'process.env.REACT_APP_DEBUG': JSON.stringify(process.env.REACT_APP_DEBUG),
            'process.env.REACT_APP_ENCRYPTION_KEY': JSON.stringify(process.env.REACT_APP_ENCRYPTION_KEY),
        })
    ],
}