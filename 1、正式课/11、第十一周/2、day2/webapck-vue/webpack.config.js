
const Webpack = require('webpack');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: __dirname + '/src/main.js', 
    output: {
        path: __dirname + '/public', 
        filename: 'bundle.js' 
    },
    mode: 'development', 
    devtool: 'eval-source-map', 
   
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        inline: true,
        port: 8888, 
        proxy: { 
        
            "/api": {
                target: 'http://localhost:9999',
                secure: false, 
                changeOrigin: false 
            }
        }
    },
   
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: ['babel-loader'], 
                exclude: '/node_modules/' 
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', "postcss-loader"]
            },

            {
                test: /\.less$/,
                
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /(\.png|\.jpg|\.jpeg|\.gif)$/,
               
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8
                        }
                    }
                ]
            },
            {
                test:/\.vue$/,
                use:['vue-loader']
            }
        ]
    },
    plugins: [
        new Webpack.BannerPlugin('你不能抄袭我的'),
        new WebpackHtmlPlugin({
            template: __dirname + '/src/index.html'
        }),
        new VueLoaderPlugin()
    ]
};

