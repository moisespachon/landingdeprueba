//npm install laravel-mix cross-env node-sass --save-dev
//npm install --save-dev imagemin-webpack-plugin copy-webpack-plugin clean-webpack-plugin imagemin-mozjpeg

const mix = require('laravel-mix');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const Clean = require('clean-webpack-plugin');

mix.webpackConfig({

    plugins: [
        new Clean(['public'], {verbose: false}),
        new CopyWebpackPlugin([{
            from: 'resources/images',
            to: 'public/images', // Laravel mix will place this in 'public/imgages'
        }]),

        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            plugins: [
                imageminMozjpeg({
                    quality: 80,
                })
            ]
        })

    ],
    devtool: 'source-map'
});

 

mix.options({
    processCssUrls: false // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
});

mix.copy('resources/fonts', 'public/fonts'); 

mix.sass('resources/sass/app.scss', 'public/css'); 

mix.scripts([
    'node_modules/jquery/dist/jquery.min.js',
    //'node_modules/popper/dist/popper.min.js',
    'node_modules/popper/dist/umd/popper.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery-validation/dist/jquery.validate.min.js'

],  'public/js/app-vendors.js');

mix.scripts([
    //MyScript
    'resources/js/test.js',

    //Plugins
    //'resources/js/plugins/test.js',
], 'public/js/app.js');

mix.sourceMaps();
