'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var nunjacksRender = require('gulp-nunjucks-render');

gulp.task('img', function () {
  gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./web/img'))
});

gulp.task('sass', function () {
  gulp.src('./src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./web/css/'))
    .pipe(browserSync.stream())
});

gulp.task('sass2', function () {
  gulp.src('./src/scss/style-form.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./web/css/'))
    .pipe(browserSync.stream())
});

gulp.task('sass3', function () {
  gulp.src('./src/scss/news.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./web/css/'))
    .pipe(browserSync.stream())
});

gulp.task('js', function () {
  gulp.src(['src/js/app.js'])
    .pipe(gulp.dest('./web/js/'));
});

gulp.task('js2', function () {
  gulp.src(['src/js/news.js'])
    .pipe(gulp.dest('./web/js/'));
});

gulp.task('js3', function () {
  gulp.src(['src/js/form.js'])
    .pipe(gulp.dest('./web/js/'));
});

gulp.task('nunjucks', function () {
  return gulp.src(['src/templates/*.html'])
    .pipe(nunjacksRender({
      path: ['src/templates']
    }))
    .pipe(gulp.dest('./web'))
});

gulp.task('build', ['img', 'sass', 'sass2', 'sass3', 'nunjucks', 'js', 'js2', 'js3'], function () {
  browserSync.init({
    server: "./web"
  });
  gulp.watch("src/scss/**/*.scss", ['sass', 'sass2', 'sass3']);
  gulp.watch("src/templates/**/*.html", ['nunjucks']);
  gulp.watch("src/js/*.js", ['js', 'js2', 'js3']);
  gulp.watch("web/*.html").on('change', browserSync.reload);
  gulp.watch("web/js/*.js").on('change', browserSync.reload);
});

gulp.task('default', ['build']);