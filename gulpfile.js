const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
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
gulp.task('default', ['copyHTML', 'sass', 'minify']);

gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['minify']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHTML']);
})