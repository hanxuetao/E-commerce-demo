/*
 * @Author: hanxuetao 
 * @Date: 2019-03-29 19:47:11 
 * @Last Modified by: hanxuetao
 * @Last Modified time: 2019-04-08 11:24:11
 */
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 环境变量配置，dev / online
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
console.log(WEBPACK_ENV)

//获取html-webpack-plugin参数的方法
const getHtmlConfig = function (name, title) {
    return {
        template: './src/view/'+ name +'.html',
        filename: 'view/'+ name +'.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}

const config = {
    entry: {
        //common 可以作为全局组件 或者样式来进行打包 同时也能打包到base.js中
        common: [path.join(__dirname, './src/page/common/index.js')],
        index: path.join(__dirname, './src/page/index/index.js'),
        login: path.join(__dirname, './src/page/login/index.js'),
        result: path.join(__dirname, './src/page/result/index.js'),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/dist/',
        filename: 'js/[name].js',
        // sourceMapFilename: '[name].[hash:8].map',
        // chunkFilename: '[id].[hash:8].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=100&name=resource/[name].[ext]',
            },
            {
                test: /\.string$/, 
                loader: 'html-loader',
                // query : {
                //     minimize : true,
                //     removeAttributeQuotes : false
                // }
            }
        ],
    },
    resolve:{
        alias:{
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    },
    externals: {
        // 在webpack打包配置中加载模块jquery
        'jquery': 'window.jQuery',
    },
    plugins: [
        // html 模版的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', 'HomePage')),
        new HtmlWebpackPlugin(getHtmlConfig('login', 'LoginPage')),
        new HtmlWebpackPlugin(getHtmlConfig('result', 'ResultPage')),
        
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js',
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
    ],
    devServer: {
        port: 8088,
        inline: true,
        proxy : {
            '**/*.do' : {
                target: 'http://test.happymmall.com',
                changeOrigin : true
            }
        }
    }
}

if ('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config