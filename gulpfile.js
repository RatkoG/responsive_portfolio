const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
})

gulp.task('copyHTML', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
})

gulp.task('minify', function () {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
})
// Watch & Serve
gulp.task('serve', ['sass', 'minify'], function () {
    browserSync.init({
        server: './build'
    })
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['minify']);
    gulp.watch('src/*.html', ['copyHTML']).on('change', browserSync.reload);
})
gulp.task('default', ['serve']);