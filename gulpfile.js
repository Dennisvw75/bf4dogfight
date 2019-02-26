const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');

// Compress images
gulp.task('imageMin', function() {
  return gulp
    .src('src/img/*')
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
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

// Compress CSS
gulp.task('minify-css', function() {
  return gulp
    .src('src/css/style.css')
    .pipe(
      cleanCSS({
        compatibility: '*'
      })
    )
    .pipe(gulp.dest('src/css-final'));
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './src'
  });

  gulp.watch(['src/scss/*.scss'], ['sass']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch(['src/css/style.css'], ['minify-css']);
  gulp.watch(['src/img/*'], ['imageMin']);
});

// Default Task
gulp.task('default', ['serve', 'sass', 'minify-css', 'imageMin']);
