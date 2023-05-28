const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UnusedWebpackPlugin = require('unused-webpack-plugin');

module.exports = (env, argv) => {
    isProd = argv.mode === 'production';
    isDebug = argv.mode === 'debug';
    isDev = argv.mode === 'development' || isDebug;

    const bundleAnalyzerPlugin = new BundleAnalyzerPlugin();
    const unusedWebpackPlugin = new UnusedWebpackPlugin({
        directories: [path.resolve(__dirname, 'src')],
        exclude: ['*.test.js'],
        root: __dirname,
    });

    const config = {
        stats: 'minimal',
        mode: 'none',
        entry: {
            app: path.join(__dirname, 'src', 'index.tsx')
        },
        devtool: 'inline-source-map',
        target: 'web',
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        devServer: {
            historyApiFallback: true,
            port: 8001,
            open: true,
            client: {
                overlay: {
                    warnings: false,
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.ts(x)?$/,
                    use: [{ loader: 'ts-loader' }],
                    exclude: '/node_modules/'
                },
                // {
                //     test: /\.css$/i,
                //     use: [
                //         { loader: "style-loader" },
                //         { loader: "css-loader" }
                //     ],
                // },
                {
                    test: /\.css$/i,
                    use: [isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
                },
                {
                    test: /^(?!.*\.module\.less$).*\.less$/i,
                    use: [
                        isProd ? { loader: MiniCssExtractPlugin.loader } : { loader: "style-loader" },
                        { loader: "css-loader", options: { modules: { mode: 'global' } } },
                        { loader: "less-loader", options: { lessOptions: { javascriptEnabled: true } } }
                    ],
                },
                {
                    test: /\.module\.less$/i,
                    use: [
                        isProd
                            ? { loader: MiniCssExtractPlugin.loader }
                            : { loader: "style-loader",
                                options: {
                                    esModule: false,
                                }
                            },
                        { loader: "dts-css-modules-loader",
                            options: {
                                namedExport: true
                            }
                        },
                        { loader: "css-loader",
                            options: {
                                modules: {
                                    localIdentName: isProd ? '[local]_[hash:base64:8]' : '[name]__[local]_[hash:base64:8]',
                                    mode: 'global'
                                },
                                sourceMap: true
                            }
                        },
                        { loader: "less-loader",
                            options: {
                                lessOptions: { javascriptEnabled: true }
                            } 
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    loader: '@svgr/webpack'
                },
                /*{
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: '[name].[ext]',
                                // outputPath: 'images'
                            }
                        }
                    ]
                    
                },*/
                {
                    test: /\.(?:|gif|png|jpg)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: () => {
                        return 'img/[name].[contenthash][ext]';
                        }
                    }
                },
                /*{
                    test: /static\/.*\..+$/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }*/
            ],
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new MiniCssExtractPlugin({
                linkType: "text/css",
                ignoreOrder: false
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'index.html')
            }),
            isDebug && bundleAnalyzerPlugin,
            isDev && unusedWebpackPlugin
        ].filter(v => v)
    }

    if (isProd) {
        config.optimization = {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        chunks: "initial",
                    }
                }
            }
        };
    }

    return config;
};
