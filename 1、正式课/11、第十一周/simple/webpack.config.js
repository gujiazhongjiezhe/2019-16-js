// webpack是基于node运行的，所以这个文件最终会在node环境下运行
module.exports = {
    entry:__dirname +'/app/main.js', // webpack打包的入口文件
    output: {
        path: __dirname + '/public', // 打包之后文件的存放路径
        filename:'bundle.js' // 打包之后文件的文件名
    },
    mode:'development', // production  development
    devtool: 'eval-source-map', // 方便页面调试
    // 配置devServer的一些选项
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port:8888, // 当前项目部署在8888端口下
        proxy:{ // 代理，用于跨域的参数配置
            "/api":{ //如果请求的路径里有/api，那就走这个跨域参数配置
                target:'http://localhost:9999',
                secure:false, // 目标服务器是否是安全的协议
                changeOrigin:false // 是否更改请求的源头
            }
        }
    },
    // 在真实的项目里，我们常常使用es6进行开发，但是当项目上线之前，咱们会把es6编译成es5
    module:{
        rules:[
            {
                test:/(\.jsx|\.js)$/, // 用正则匹配文件的后缀名，匹配到的文件要用loader进行处理
                use:['babel-loader'], // 需要使用的loader
                exclude: '/node_modules/' // 这个文件夹下的文件不需要使用loader处理
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader',"postcss-loader"]
            },
            
            {
                test:/\.less$/,
                // 这个顺序不能颠倒，webpack会从后往前解析，先使用less-loader把less编译成css，在使用css-loader把css中的样式注入到js文件中，最后在使用style-loader在页面创建style标签，然后把js中的css样式放进style标签中
                use:['style-loader','css-loader','less-loader']
            }
        ]
    }
};