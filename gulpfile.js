const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const easyImport = require('postcss-easy-import')
const nested = require('postcss-nested')

gulp.task('js', function () {
  return gulp.src([
    'node_modules/feather-icons/dist/feather.js',
    'script.js'
  ])
    .pipe(babel())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('js-watch', ['js'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('css', function () {
  return gulp.src('style.css')
    .pipe(postcss([
      easyImport,
      nested,
      autoprefixer({
        browsers: ['last 3 versions']
      }),
    ]))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream())
});

gulp.task('default', ['js', 'css'], function () {
  browserSync.init({
    port: 3001,
    ui: false
  });

  gulp.watch('style.css', ['css']);
  gulp.watch('script.js', ['js-watch']);
});

gulp.task('build', ['js', 'css'], function() {
  console.log('Run `yarn serve` to launch Ouistiti!')
});
