const gulp = require('gulp');
const { src, dest, watch, series } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const imagewebp = require('gulp-webp');
const optimage = require('gulp-image');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');



//create functions 
//html
function minhtml() {
    return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true}))
    .pipe(dest('dist'));a
}

function cssTask() {
    return src('src/SASS/*.css')
      .pipe(sourcemaps.init())
      .pipe(concat('style.css'))
      .pipe(postcss([autoprefixer(), cssnano()])) //not all plugins work with postcss only the ones mentioned in their documentation
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/SASS'));
  }
  
//   function watchTask() {
//     watch([cssPath, jsPath], { interval: 1000 }, parallel(cssTask, jsTask));
//   }
//Images
function optimizeimage() {
    return src('src/images/*.{jpg,png}')
    .pipe(optimage())
    .pipe(dest('dist/images'))
}

function webpImage() {
    return src('src/images/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('dist/images'))
}
//create watchtask
function watchtask() {
    // watch('src/scss/*.scss', compilescss);
    watch('dist/images/*.{jpg, png}', webpImage);
}

function copyFonts(){
    return src('src/fonts/*').pipe(gulp.dest('dist/fonts'));
}

function jsTask() {
    return src('src/js/*')
      .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
      .pipe(terser())
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/js'));
  }
//default gulp
exports.default = series(
    minhtml,
     optimizeimage,
    cssTask,
     copyFonts,
    webpImage,
    jsTask,
    watchtask
);
gulp.task('default', async  function(){
    console.log("This is default task!");
  });