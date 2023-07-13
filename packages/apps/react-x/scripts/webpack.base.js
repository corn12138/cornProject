const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = (isDev) => ({
    entry: path.join(__dirname, '../src/index.tsx'),
    mode: isDev ? "development" : "production",
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        path: path.join(__dirname, "../dist"),
        clean: true, //w4 - clean-webpack-plugin
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                oneOf: [
                    {
                        // 定义一下，使用 xxx.module.（less|css)
                        test: /.module.(less|css)$/,
                        include: [path.resolve(__dirname, '../src')],
                        use: [
                            // 我们一般情况下，在开发环境中，我们用 'style-loader', 方便我们做热更新。
                            // 生产环境下，我们要放在单独的文件里。
                            !isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 2,
                                    // 开启 css modules
                                    modules: {
                                        localIdentName: '[path][name]__[local]--[hash:base64:4]'
                                    }
                                }
                            },
                            "postcss-loader",
                            "less-loader"
                        ]
                    },
                    {
                        test: /.(less)$/,
                        use: [
                            // 我们一般情况下，在开发环境中，我们用 'style-loader', 方便我们做热更新。
                            // 生产环境下，我们要放在单独的文件里。
                            !isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                            "css-loader",
                            "postcss-loader",
                            "less-loader"
                        ]
                    },
                    {
                        test: /.(css)$/,
                        use: [
                            // 我们一般情况下，在开发环境中，我们用 'style-loader', 方便我们做热更新。
                            // 生产环境下，我们要放在单独的文件里。
                            !isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                            "css-loader",
                            "postcss-loader",
                        ]
                    },
                ]
            },
            {
                test: /.(png|jpg|jepg|git|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                },
                generator: {
                    filename: 'static/images/[name][ext]'
                }
            },
            {
                test: /.(woff2|eot|ttf|otf)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                },
                generator: {
                    filename: 'static/fonts/[name][ext]'
                }
            },
            {
                test: /.(mp4|mp3|webm)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                },
                generator: {
                    filename: 'static/medias/[name][ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            "@": path.join(__dirname, '../src')
        },
    },
    

    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
            inject: true,
        }),
        new MiniCssExtractPlugin({
            // [content hash] - chunk hash - hash : 内容变了，我才有消除缓存的意义和价值。
            filename: 'static/css/[name].[contenthash:8].css'
        }),
        new webpack.DefinePlugin({
            'process.env.PRIMARY': JSON.stringify(process.env.PRIMARY)
        })
    ]
})