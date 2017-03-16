module.exports = {
    entry : {
        admin : './src/main.js',
        user : './src/mainUser.js'
    },
    output : {
        path : 'build',
        publicPath : '/assets/',
        filename : '[name].js'
    },
    module : {
        loaders : [
            {
                test : /\.js$/,
                loader : 'babel-loader',
                exclude : /node_modules/
            },
            {
                test : /\.vue$/,
                loader : 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            }
        ]
    },
    resolve: {
       extensions: ['', '.js', '.css', '.vue', '.styl']
    }
}