const gulp = require('gulp');
const changed = require('gulp-changed');
const htmlmin = require('gulp-htmlmin');
const scss = require('gulp-sass');
const bprfx = require('gulp-autoprefixer');
const tysc = require('gulp-typescript');
const babel = require('gulp-babel');
const jsmin = require('gulp-uglify');
const imgmin = require('gulp-imagemin');
const imgminp = require('imagemin-pngquant');
const imgminj = require('imagemin-mozjpeg');
const prcs = require('child_process').exec;


const src = './src/';
const srcImages = src + 'images/';

const dist = './dist/';
const distImages = dist + 'images/';

gulp.task('html', function()
{
    return gulp.src(src + '*.html')
        .pipe(changed(dist))
        .pipe(htmlmin({collapseWhitespace : true, removeComments : true}))
        .pipe(gulp.dest(dist));
});

gulp.task('css', function()
{
    return gulp.src(src + '*.scss')
        .pipe(changed(dist))
        .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
        .pipe(bprfx(['last 3 versions', 'ie >= 10', 'Android >= 4', 'iOS >= 8']))
        .pipe(gulp.dest(dist));
});

gulp.task('js', function()
{
    return gulp.src(src + '*.ts')
        .pipe(changed(dist))
        .pipe(tysc({ target: "ES5", removeComments: true}))
        .pipe(babel({"presets": ["@babel/preset-env"]}))
        .pipe(jsmin())
        .pipe(gulp.dest(dist));
});

gulp.task('json', function()
{
    return gulp.src(src + '*.json')
        .pipe(changed(dist))
        .pipe(gulp.dest(dist));
});

gulp.task('jishoJson', function()
{
    return prcs('python ../jishoJsonWoSort.py ../jisho/ ./dist/');
});

gulp.task('img', function()
{
    return gulp.src(srcImages + '*.{png,jpg,gif,svg}')
        .pipe(changed(distImages))
        .pipe
        (
            imgmin([imgminp({quality: [.65, .8], speed: 1, floyd: 0}),
            imgminj({quality: 85, progressive: true}), imgmin.svgo(), imgmin.optipng(), imgmin.gifsicle()])
        )
        .pipe(gulp.dest(distImages));

});

gulp.task('default', gulp.parallel('html', 'css', 'js', 'json','jishoJson', 'img'));
