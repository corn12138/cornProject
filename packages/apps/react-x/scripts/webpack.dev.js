
const getBaseCfg = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');

console.log("OPTM:" , process.env.PRIMARY)

module.exports = merge(getBaseCfg(true), {
    devtool: "source-map",
    devServer: {
        port: 3000,
        compress: false, 
        hot: true, // 热更新
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, '../public')
        }
    }
})