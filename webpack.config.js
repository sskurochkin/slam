const path = require('path');
const fs = require('fs');
const glob = require('glob');//дает возможность использовать */*.pug

// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

//const WebpackConcatFilesPlugin = require('webpack-concat-files-plugin');
const MergeWebpackPlugin = require('merge-webpack-plugin');

// записываем названия папок с страницами в массив pages
const pages = fs.readdirSync(path.resolve(__dirname, 'src/pages/'));

//очистить файлы при запуске
let flag = true;
if(flag){
    fs.writeFileSync(`src/mixins/mixins.pug`, '');
    fs.writeFileSync(`src/webpack_lists/components_css.js`, '');
    fs.writeFileSync(`src/webpack_lists/critical_mixins_components.scss`, '');
    flag = false;
}

// копировать в mixins/mixin.pug все содержимое components/mixin__*.pug и mixins/mixin__*.pug
glob("src/**/mixin__*.pug", function (er, files) {
    files.map(function (fileName){
        let fileData = fs.readFileSync(`${fileName}`,(err, data) => {
            if (err) throw err;
        });
        fs.appendFileSync(`src/mixins/mixins.pug`, fileData);
    })
});


//КОМПОНЕНТЫ

// массив путей до файлов стилей компонентов
let cssComponents = glob.sync("src/components/*/style.scss");
//формируем содержимое файла components_css.js
cssComponents.map(function (fileName, index){
    let dirFilename = fileName.replace('src/','');
    fs.appendFileSync(`src/webpack_lists/components_css.js`, 'import "../'+ dirFilename +'";\n');
});


// массив путей до файлов крит стилей миксинов/компонентов
let cssCriticalMixinsDirs = glob.sync("src/mixins/*/*.scss"),
    cssCriticalComponentsDirs = glob.sync("src/components/*/critical.scss"),
    cssCriticalDirs = cssCriticalMixinsDirs.concat(cssCriticalComponentsDirs);
//формируем содержимое файла critical_mixins_components.scss
cssCriticalDirs.map(function (fileName, index){
    let dirFilename = fileName.replace('src/','');
    fs.appendFileSync(`src/webpack_lists/critical_mixins_components.scss`, '@import "../'+ dirFilename +'";\n');
});


// массив путей до файлов js компонентов
const jsPaths = glob.sync('./src/components/*/*.js');
let jsEntries = toObject(jsPaths);
function toObject(jsPaths) {
    const entry = {};
    jsPaths.map(function (path,index){
        let dirname = path.replace('./src/components/','').replace('/script.js','');
        entry[dirname] = path;
    })
    return entry;
}



// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || '/';
const isDevMode = process.env.MODE === 'development';
const filename = (ext,directory) =>
    isDevMode
    ? `${directory}/[name].min.${ext}`
    : `${directory}/[name].min.${ext}`;

const minimize = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (!isDevMode) {
        config.minimizer = [
            new TerserWebpackPlugin(),
            //new OptimizeCssAssetsWebpackPlugin()
        ]
    }

    return config;
}



module.exports = [
    // externals: {
    //     paths: PATHS
    // },
    //основной конфиг
    {
        entry:  {
            app: path.resolve(__dirname, './src/assets/js/main.js'),
        },
        output: {
            publicPath: ASSET_PATH,
            path: path.resolve(__dirname, './local/templates/html/'),
            filename: filename('js','js'),
        },
        devtool: isDevMode ? 'source-map' : false,
        mode: 'development',
        devServer: {
            port: 5000,
            hot: true
        },
        module: {
            rules: [
                {
                    test: /\.txt$/i,//для добавления в main.js содержимого txt файлов импортом
                    use: 'raw-loader',
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        // {
                        //     loader: "apply-loader"
                        // },
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        },
                    ]
                },
                {
                    // test:/\.(scss|sass|css)$/,
                    test: /.s?css$/i,
                    exclude: /node_modules/,
                    use: [
                        {loader: 'file-loader',
                            options: {
                                name: '[folder]/[name].css',
                                context: './',
                                outputPath: '/components-template/',
                                publicPath: '/dist'
                            }
                        },
                        {
                            loader: 'extract-loader'
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
                {
                    test: /\.(pug|jade)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "html-loader",
                            options: {
                                attributes: false//не учитываем default пути src для картинок и т.д.
                            }
                        },
                        {
                            loader: "pug-html-loader",
                            options: {
                                pretty: true//отключает компил html в одну строку
                            }
                        },

                    ]

                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    exclude: /node_modules/,
                    use: ['file-loader','webp-loader'],
                },
                // {
                //     test: /\.svg$/,
                //     include: ico,
                //     use: ['svg-sprite-loader', 'svgo-loader']
                // },
            ]
        },
        optimization: minimize(),
        plugins: [
            //дублируем jquery скрипт (без обработки)
            new CopyWebpackPlugin({
                patterns: [{
                    from: 'jquery/*.js',
                    context: './src/assets/js/',
                    to: path.resolve(__dirname, './local/templates/html/js/')
                }]
            }),

            //дублируем vendor скрипты, подгружаемые по событию (без обработки)
            new CopyWebpackPlugin({
                patterns: [{
                    from: 'vendor/*.js',
                    context: './src/assets/js/',
                    to: path.resolve(__dirname, './local/templates/html/js/')
                }]
            }),

            //перегоняем страницы pug в html из src/pages/*/
            ...pages.map(page => new HtmlWebpackPlugin({
                template: `src/pages/${page}/${page}.pug`,
                filename: `${page}.html`,
                inject: false,//отмена автоматического подключения js/css
            })),
            new HtmlWebpackPugPlugin(),

            //картинки
            new CopyWebpackPlugin({
                patterns: [{
                    from: '**/*',
                    context: './src/assets/images/',
                    to: path.resolve(__dirname, './local/templates/html/images/'),
                }]
            }),
            new ImageMinimizerWebpackPlugin({
                minimizerOptions: {
                    // Lossless optimization with custom option
                    // Feel free to experiment with options for better result for you
                    plugins: [
                        ['gifsicle', { interlaced: true }],
                        ['jpegtran', { progressive: true }],
                        ['optipng', { optimizationLevel: 5 }],
                        [
                            'svgo',
                            {
                                plugins: [
                                    {
                                        removeViewBox: false,
                                    },
                                ],
                            },
                        ],
                    ],
                },
            }),

        ]
    },
    //конфиг для компонентов css
    {
        entry:  {
            components_css: path.resolve(__dirname, './src/webpack_lists/components_css.js'),
        },
        output: {
            publicPath: ASSET_PATH,
            path: path.resolve(__dirname, './local/templates/html/'),
            filename: filename('js','dev_files'),
        },
        devtool: isDevMode ? 'source-map' : false,
        mode: 'development',
        devServer: {
            port: 5000,
            hot: true
        },
        module: {
            rules: [
                {
                    test: /.s?css$/i,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[folder]/[name].css',
                                context: './',
                                outputPath: '/components-template/',
                            }
                        },
                        {
                            loader: 'extract-loader'
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
            ]
        },
        optimization: minimize(),
        plugins: []
    },
    //конфиг для critical.css
    {
        entry:  {
            critical: path.resolve(__dirname, './src/webpack_lists/critical_css.js'),
        },
        output: {
            publicPath: ASSET_PATH,
            path: path.resolve(__dirname, './local/templates/html/'),
            filename: filename('js','dev_files'),
        },
        devtool: isDevMode ? 'source-map' : false,
        mode: 'development',
        devServer: {
            port: 5000,
            hot: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        },
                    ]
                },
                {
                    test: /.s?css$/i,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].css',
                                context: './',
                                outputPath: '/',
                            }
                        },
                        {
                            loader: 'extract-loader'
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
            ]
        },
        optimization: minimize(),
        plugins: []
    },
    //конфиг для компонентов js
    {
        entry:  jsEntries,//массив входных точек
        output: {
            publicPath: ASSET_PATH,
            path: path.resolve(__dirname, './local/templates/html/components-template/'),
            filename: '[name]/script.js'
        },
        devtool: isDevMode ? 'source-map' : false,
        mode: 'development',
        devServer: {
            port: 5000,
            hot: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        // {
                        //     loader: 'file-loader',
                        //     options: {
                        //         name: '[folder]/[name].js',
                        //         context: './',
                        //         outputPath: '/components-template/',
                        //         //publicPath: '/dist'
                        //     }
                        // },
                        // {
                        //     loader: "apply-loader"
                        // },
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        },
                        // isDevMode ? 'eslint-loader' : '', - изменен на плагин
                    ]
                },

            ]
        },
        optimization: minimize(),
        plugins: [
            /*new ESLintPlugin({//ошибка ???
            })*/
        ]
    },
]