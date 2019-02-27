const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');

// Compress images
gulp.task('imageMin', function() {
  return gulp
    .src('img/*')
    .pipe(
      imagemin({
        progressive: true
      })
    )
    .pipe(gulp.dest('src/image-min'));
});

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
  return gulp
    .src(['src/scss/*.scss'])
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

// Compress CSS
gulp.task('minify-css', function() {
  return gulp
    .src('css/style.css')
    .pipe(
      cleanCSS({
        compatibility: '*'
      })
    )
    .pipe(gulp.dest('src/css-final'));
});

// Compile JS to es2015
gulp.task('es6', function() {
  return gulp
    .src('js/main.js')
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(gulp.dest('src/js-final'));
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './src'
  });

  gulp.watch(['src/scss/*.scss'], ['sass']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch(['css/style.css'], ['minify-css']);
  gulp.watch(['img/*'], ['imageMin']);
  gulp.watch(['js/main.js'], ['es6']);
});

// Default Task
gulp.task('default', ['serve', 'sass', 'minify-css', 'imageMin', 'es6']);
