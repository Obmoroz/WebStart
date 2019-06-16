// Webpack v4
const webpack = require('webpack');
const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const CopyWebpackPlugin  = require('copy-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//var stylus_plugin = require('stylus-loader');

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, '../src'),
    cabinet: path.join(__dirname, './src/js/cabinet'),
    public: path.join(__dirname, './public'),
    assets: path.join(__dirname, './public/assets'),
    css:'../../../assets/css',
};

module.exports = {
    externals:{
        paths: PATHS
    },
    watchOptions: {
        ignored: './node_modules/',
        aggregateTimeout: 300,
        poll: 1000
    },
    entry: {
        index: "./src/index.js",
       // branches:PATHS.cabinet+"/branches.js",
        //orgs:PATHS.cabinet+"/orgs.js",
       // statistics:PATHS.cabinet+"/statistics.js",
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../public/assets/js'),
    },
    module: {
        rules: [
            {
                test: /test\.js$/,
                use: 'mocha-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{sourceMap: true,url: true}
                    },
                    {
                        loader:'postcss-loader',
                        options:{sourceMap: true, config :{path:__dirname + '/'}}
                    }
                ],
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader' ,
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{sourceMap: true,url: false}// осталось найти как заменять пути в css для картиное и шрифтов
                    },
                    {
                        loader:'postcss-loader',
                        options:{sourceMap: true,config :{path:__dirname + '/'}}
                    },
                    {
                        loader:'stylus-loader',
                        options:{sourceMap: true}
                    },
                ],
            },
            {
                test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader',
                options:{name: `${PATHS.css}/[path][name].[ext]`}
            },
            /*{
                test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000',
                options:{name: `${PATHS.css}/[name].[ext]`}
            },*/
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: '/node_modules/'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loader: {
                        css: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            },
        ]
    },
    resolve: {
        alias: {
            'semantic-ui': path.join(__dirname, "node_modules", "semantic-ui-css", "semantic.js"),
            //'vue$': 'vue/dist/vue.js',
        },
        extensions: [ '.js', '.jsx']
    },
    // devtool: 'inline-source-map',

    plugins: [
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery/dist/jquery.min",
            jQuery: "jquery/dist/jquery.min.js",
            Vue: "vue/dist/vue.js",
            VueResource:  "vue-resource/dist/vue-resource.min.js",
            VueDataScooper: "vue-data-scooper/dist/vue-data-scooper.js"
        }),
      /*  new CopyWebpackPlugin([
            {from: `${PATHS.src}/images`, to: `${PATHS.assets}/images`}
        ]),*/ //копирование файлов без обработки

        new MiniCssExtractPlugin({
            filename: `${PATHS.css}/[name].css`
        })

    ],

};