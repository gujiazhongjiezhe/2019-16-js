// 当期这个文件是vue/cli的生成的项目的配置文件；因为这个项目没有webpack.config.js文件，你所想要的所有的配置都在这个文件中配置就可以了
module.exports = {
    publicPath: './',
    lintOnSave:false, // 如果是false，那么eslint代码校验就不在抛出警告
    devServer:{ // 配置代理
        proxy: 'http://localhost:3000' // 后台项目的跑的端口号
    },
    // 会将这个对象和内置的配置文件进行合并
    // configureWebpack:{
    //     modules:{
    //         rules:[
    //             {
    //                 test:/\.(png|jpg|gif|)$/,
    //                 use:['url-loader']
    //             },{}
    //         ]
    //     }
    // }
}