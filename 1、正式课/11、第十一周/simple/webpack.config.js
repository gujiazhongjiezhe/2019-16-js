// webpack是基于node运行的，所以这个文件最终会在node环境下运行
const Webpack = require('webpack');
const WebpackHtmlPlugin = require('html-webpack-plugin');
module.exports = {
    entry: __dirname + '/app/main.js', // webpack打包的入口文件
    output: {
        path: __dirname + '/public', // 打包之后文件的存放路径
        filename: 'bundle.js' // 打包之后文件的文件名
    },

    // 多入口多出口配置方式
    // entry: {
    //     main:__dirname +'/app/main.js',
    //     a:__dirname +'/app/a.js'
    // },
    // output:{
    //     path:__dirname + '/public',
    //     filename: '[name].js'
    // },





    mode: 'development', // production  development
    devtool: 'eval-source-map', // 方便页面调试
    // 配置devServer的一些选项
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 8888, // 当前项目部署在8888端口下
        proxy: { // 代理，用于跨域的参数配置
            // http://www.baidu.com:8080/api/index
            "/api": { //如果请求的路径里有/api，那就走这个跨域参数配置
                target: 'http://localhost:9999',
                secure: false, // 目标服务器是否是安全的协议
                changeOrigin: false // 是否更改请求的源头
            }
        }
    },
    // 在真实的项目里，我们常常使用es6进行开发，但是当项目上线之前，咱们会把es6编译成es5
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/, // 用正则匹配文件的后缀名，匹配到的文件要用loader进行处理
                use: ['babel-loader'], // 需要使用的loader
                exclude: '/node_modules/' // 这个文件夹下的文件不需要使用loader处理
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', "postcss-loader"]
            },

            {
                test: /\.less$/,
                // 这个顺序不能颠倒，webpack会从后往前解析，先使用less-loader把less编译成css，在使用css-loader把css中的样式注入到js文件中，最后在使用style-loader在页面创建style标签，然后把js中的css样式放进style标签中
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /(\.png|\.jpg|\.jpeg|\.gif)$/,
                // use:['url-loader']
                // 1、base64的优点：减少了http请求，加快了页面的加载时间；避免了图片的跨域，而且还不会造成图片的缓存问题
                // 2、缺点：数据量比较大，可读性不好，Ie8以后不可用
                // 3、如果图片的大小超出了limit的限制，那就会默认调用file-loader去处理这个图片，此时会生成一个新的图片，而不是再去转base64了
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new Webpack.BannerPlugin('你不能抄袭我的'),
        new WebpackHtmlPlugin({
            template: __dirname + '/app/index.html'
        })
    ]
};

// 初始化webpack
// npm i webpack webpack-cli --save-dev
// 在package.json里的scripts里配置一个脚本 'start':'webpack'

// 下载起服务插件，实时刷新：npm install --save-dev webpack-dev-server

// 配置es6转es5
// // npm一次性安装多个依赖模块，模块之间用空格隔开
// npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react

// 配置css
// css-loader  style-loader postcss-loader  autoprefixer

// 配置less
// less  less-loader