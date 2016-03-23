'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*','main-bower-files','uglify-save-license','del']
});

//gulp.task("build",function(){
//    gulp.src("bower_components/jquery/dist/jquery.js").pipe(gulp.dest("dist/js/"));
//    gulp.src("bower_components/angular/angular.js").pipe(gulp.dest("dist/js/"));
//    gulp.src("bower_components/bootstrap/dist/js/bootstrap.js").pipe(gulp.dest("dist/js/"));
//    gulp.src("bower_components/bootstrap/dist/css/**").pipe(gulp.dest("dist/css/"));
//});

gulp.task('partials', function() {
    return gulp.src([
        paths.src + '/{app,components}/**/*.html',
        paths.tmp + '/{app,components}/**/*.html'
    ])
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js',{
            module: 'proangularjs'
        }))
        .pipe(gulp.dest(paths.tmp + '/partials/'));
});

gulp.task('html',['inject','partials'],function() {
    var partialsInjectFile = gulp.src(paths.tmp + '/partials/templateCacheHtml.js', { read: false });
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: paths.tmp + '/partials',
        addRootSlash: false
    };

    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src(paths.tmp + '/serve/*.html')
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.replace('../../bower_components/bootstrap/fonts', '../fonts/'))
        .pipe($.replace('../../bower_components/fontawesome/fonts', '../fonts/'))
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest(paths.dist + '/'))
        .pipe($.size({ title: paths.dist + '/', showFiles: true }));
});

gulp.task('i18n',function() {
    gulp.src(paths.tmp+'/serve/assets/i18n/*.json')
        .pipe(gulp.dest(paths.dist+'/assets/i18n/'));
});

gulp.task('images',function(){
    return gulp.src(paths.src+'/assets/img/**/*').pipe(gulp.dest(paths.dist+'/img/'));
});

gulp.task('fonts',function() {
    return gulp.src('bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}').pipe(gulp.dest(paths.dist+'/fonts/'));
});

gulp.task('clean',function(done) {
    $.del([paths.dist+'/',paths.tmp+'/'],done);
});

gulp.task('build',['html','images','fonts']);