

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var nunjacksRender = require('gulp-nunjucks-render');

//gulp.task('img', ()=> {
 // gulp.src('./src/img/**/*')
  //  .pipe(gulp.dest('./web/img'))
//});

gulp.task('sass1',async ()=> {
  await gulp.src('./src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./web/css/'))
    .pipe(browserSync.stream())
});

gulp.task('sass2', async ()=> {
  await gulp.src('./src/scss/style-form.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./web/css/'))
    .pipe(browserSync.stream())
});

gulp.task('sass3', async ()=>  {
  await gulp.src('./src/scss/news.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./web/css/'))
    .pipe(browserSync.stream())
});

gulp.task('js1',async  ()=>  {
  await gulp.src(['src/js/app.js'])
    .pipe(gulp.dest('./web/js/'));
});

gulp.task('js2',  async()=>  {
  await gulp.src(['src/js/news.js'])
    .pipe(gulp.dest('./web/js/'));
});

gulp.task('js3', async ()=>  {
  await gulp.src(['src/js/form.js'])
    .pipe(gulp.dest('./web/js/'));
});

gulp.task('nunjucks1',  ()=>  {
  return gulp.src(['src/templates/*.html'])
    .pipe(nunjacksRender({
      path: ['src/templates']
    }))
    .pipe(gulp.dest('./web'))
});

gulp.task('build', gulp.series(
  /* 'img', */ 'sass1', 'sass2', 'sass3', 'nunjucks1', 'js1', 'js2', 'js3',
  () => {
    browserSync.init({
      server: "./web"
    });
  
  
    gulp.watch("src/scss/**/*.scss", gulp.series('sass1', 'sass2', 'sass3'));
    gulp.watch("src/templates/**/*.html",gulp.series('nunjucks1'));
    gulp.watch("src/js/*.js",gulp.series('js1', 'js2', 'js3'));
    gulp.watch("web/*.html").on('change', browserSync.reload);
    gulp.watch("web/js/*.js").on('change', browserSync.reload);
  }));

gulp.task('default',gulp.series('build'));