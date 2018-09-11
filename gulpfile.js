const gulp = require('gulp');
const gulpsync = require("gulp-sync")(gulp);
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const lesslint = require('gulp-stylelint');
const less = require('gulp-less');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');
const del = require('del');
const browserSync = require("browser-sync").create();
const shell = require('gulp-shell');

gulp.task('clean', () => {
    return gulp.src('./public', {
            read: false
        })
        .pipe(clean());
});

// linters
gulp.task('lint:js', () => {
    return gulp.src(['./scripts/**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint:less', () => {
    return gulp.src('./styles/**/.less')
        .pipe(lesslint());
});

gulp.task('lint', gulpsync.sync(['lint:js', 'lint:less']));

// compile
gulp.task('compile:less', () => {
    return gulp.src('./styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('compile:js', () => {
    return gulp.src('./scripts/**/*.js')
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest('./public/scripts'));
});

gulp.task('compile', gulpsync.sync(['compile:less', 'compile:js']));

// gulp watch
gulp.task('watch', () => {
    gulp.watch('./styles/*.less', ['compile:less']);
    gulp.watch('./scripts/**/*', ['compile:js']);
});

// copy 
gulp.task('copy:images', () => {
    return gulp.src('./images/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin({
            interlaced: true
        }))
        .pipe(gulp.dest('./public/images'));
});

gulp.task('copy:fonts', () => {
    return gulp.src('./fonts/*')
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('copy:templates', () => {
    return gulp.src('./templates/*.handlebars')
        .pipe(gulp.dest('./public/templates'));
});

gulp.task('copy:html', () => {
    return gulp.src('./*.html')
        .pipe(gulp.dest('./public'));
});

gulp.task('copy:js', () => {
    return gulp.src('./*.js')
        .pipe(gulp.dest('./public'));
});

gulp.task('copy', gulpsync.sync(['copy:html', 'copy:templates', 'copy:fonts', 'copy:images', 'copy:js']));

// uglify
gulp.task('uglify:js', () => {
    del.sync(['./public/js/min/min.js']);
    return gulp.src([
        './public/*.js', 
        './public/scripts/controllers/*.js',
        './public/scripts/requests/*js',
        './public/scripts/utils/*js'])
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./public/scripts/min'));
});

gulp.task('uglify:css', () => {
    return gulp.src("./styles/*.css")
    .pipe(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
    }))
    .pipe(gulp.dest("./public/styles/min"));
});

gulp.task('uglify', gulpsync.sync(['uglify:css', 'uglify:js']));

//start
gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });

});

// build
gulp.task('build', gulpsync.sync(['clean', 'compile', 'lint', 'uglify', 'copy']));

//node_modules
// dev
gulp.task('dev', gulpsync.sync(['build', 'watch', 'server']));

// deploy
gulp.task('deploy', shell.task([
    'firebase deploy'
]));