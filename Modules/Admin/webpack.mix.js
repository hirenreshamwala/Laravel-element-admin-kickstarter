const dotenvExpand = require('dotenv-expand');
dotenvExpand(require('dotenv').config({ path: '../../.env'/*, debug: true*/}));
require('laravel-mix-svg-sprite');

const mix = require('laravel-mix');
require('laravel-mix-svg-sprite');
require('mix-tailwindcss');
require('laravel-mix-merge-manifest');

mix.svgSprite(
    __dirname+'/Resources/assets/js/icons/svg', // The directory containing your SVG files
    'output/sprite.svg', // The output path for the sprite
    {
        symbolId: 'icon-[name]'
    }
);

mix.setPublicPath('../../public').mergeManifest();

mix.js(__dirname+'/Resources/assets/js/app.js', 'js/admin')
    .sass(__dirname + '/Resources/assets/sass/app.scss', 'css/admin')
    .tailwind('./tailwind.config.js');


mix.webpackConfig({
    output: {
        chunkFilename: 'js/admin/chunks/[name].js?id=[chunkhash]',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'Resources/assets/js/')
        }
    }
});

if (mix.inProduction()) {
    mix.version();
}
