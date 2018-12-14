const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const browserify = require('gulp-browserify');

/*
--TOP LEVEL FUNCTIONS
gulp.task
gulp.src
gulp.dest
gulp.watch
*/

gulp.task('scripts', () => {
    gulp.src('src/scripts/**/*.js')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(browserify())
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', () => {
    gulp.src('src/scss/*.scss')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleancss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('images', () => {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('run',['scripts','styles','images']);

gulp.task('watch',() => {
    gulp.watch('src/img/**/*',['images']);
    gulp.watch('src/scss/**/*.scss',['styles']);
    gulp.watch('src/scripts/**/*.js',['scripts']);
});

gulp.task('default',['watch']);
