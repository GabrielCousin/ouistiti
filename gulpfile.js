const { dest, src, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create()
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const concat = require('gulp-concat')
const easyImport = require('postcss-easy-import')
const nested = require('postcss-nested')

function js(cb) {
  src([
    'node_modules/feather-icons/dist/feather.js',
    './script.js'
  ])
    .pipe(concat('script.js'))
    .pipe(dest('public'));

  cb();
}

function css(cb) {
  src('style.css')
    .pipe(postcss([
      easyImport,
      nested,
      autoprefixer(),
    ]))
    .pipe(dest('public'))
    .pipe(browserSync.stream());

  cb();
}

exports.default = series(parallel(js, css), function serve(cb) {
  browserSync.init({
    port: 3001,
    ui: false
  });

  watch('style.css', css);
  watch('script.js', series(js, function reload(_cb) {
    browserSync.reload();
    _cb();
  }));

  cb();
})

exports.build = series(parallel(js, css), function success (cb) {
  console.log('Run `yarn serve` to launch Ouistiti!');
  cb();
});
