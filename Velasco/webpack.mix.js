const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .react()  // Enable React support
   .sass('resources/sass/app.scss', 'public/css');
   mix.sass('resources/sass/home.scss', 'public/css');
