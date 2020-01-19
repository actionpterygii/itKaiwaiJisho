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
const webserver = require('gulp-webserver');


const src = './src/';
const srcImages = './images/';

const dist = './docs/';
const distImages = dist + 'images/';


gulp.task('html', function()
{
    return gulp.src(src + '*.html')
        .pipe(changed(dist))
        .pipe(htmlmin({collapseWhitespace : true, removeComments : true}))
        .pipe(gulp.dest(dist));
});

gulp.task('watchHtml', function()
{
    return gulp.watch(src + '*.html', gulp.task('html'));
});


gulp.task('css', function()
{
    return gulp.src(src + '*.scss')
        .pipe(changed(dist))
        .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
        .pipe(bprfx(['last 3 versions', 'ie >= 10', 'Android >= 4', 'iOS >= 8']))
        .pipe(gulp.dest(dist));
});

gulp.task('watchCss', function()
{
    return gulp.watch(src + '*.scss', gulp.task('css'));
});

gulp.task('js', function()
{
    return gulp.src(src + '*.js')
        .pipe(changed(dist))
        .pipe(babel({"presets": ["@babel/preset-env"]}))
        .pipe(jsmin())
        .pipe(gulp.dest(dist));
});

gulp.task('watchJs', function()
{
    return gulp.watch(src + '*.js', gulp.task('js'));
});


gulp.task('ts', function()
{
    return gulp.src(src + '*.ts')
        .pipe(changed(dist))
        .pipe(tysc({ target: "ES5", removeComments: true}))
        .pipe(babel({"presets": ["@babel/preset-env"]}))
        .pipe(jsmin())
        .pipe(gulp.dest(dist));
});

gulp.task('watchTs', function()
{
    return gulp.watch(src + '*.ts', gulp.task('ts'));
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

gulp.task('watchImg', function ()
{
    return gulp.watch(srcImages + '*.{png,jpg,gif,svg}', gulp.task('img'));
});


gulp.task('ico', function()
{
    return gulp.src(srcImages + '*.ico')
        .pipe(changed(distImages))
        .pipe(gulp.dest(distImages));
});

gulp.task('watchIco', function ()
{
    return gulp.watch(srcImages + '*.{ico}', gulp.task('ico'));
});


gulp.task('jishoJson', function()
{
    return prcs('python jishoJsonWoSort.py ./jisho/ ./docs/');
});

gulp.task('watchJishoJson', function()
{
    return gulp.watch('./jisho/jisho.json', gulp.task('jishoJson'));
});


gulp.task('json', function()
{
    return gulp.src(src + '*.json')
        .pipe(changed(dist))
        .pipe(gulp.dest(dist));
});

gulp.task('watchJson', function()
{
    return gulp.watch(src + '*.json', gulp.task('json'));
});


gulp.task('webserver', function()
{
    return gulp.src(dist)
        .pipe(webserver(
        {
            livereload: true,
            port: 8001,
            fallback: 'index.html',
            open: true
        }));
});


gulp.task('start', gulp.parallel('webserver', 'watchHtml', 'watchCss', 'watchJs', 'watchTs', 'watchImg', 'watchIco', 'watchJson', 'watchJishoJson'));

gulp.task('default', gulp.parallel('html', 'css', 'js', 'ts', 'img', 'ico', 'json', 'jishoJson'));
