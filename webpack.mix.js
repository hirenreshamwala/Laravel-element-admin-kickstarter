const mix = require('laravel-mix');
require('mix-tailwindcss');
require('laravel-mix-svg-sprite');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.svgSprite(
    'resources/js/icons/svg', // The directory containing your SVG files
    'output/sprite.svg', // The output path for the sprite
    {
        symbolId: 'icon-[name]'
    }
);

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .tailwind('./tailwind.config.js');

mix.webpackConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js/')
        }
    }
});