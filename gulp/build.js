var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*','main-bower-files','del']
});

//gulp.task("build",function(){
//    gulp.src("bower_components/jquery/dist/jquery.js").pipe(gulp.dest("dist/js/"));
//    gulp.src("bower_components/angular/angular.js").pipe(gulp.dest("dist/js/"));
//    gulp.src("bower_components/bootstrap/dist/js/bootstrap.js").pipe(gulp.dest("dist/js/"));
//    gulp.src("bower_components/bootstrap/dist/css/**").pipe(gulp.dest("dist/css/"));
//});

gulp.task('i18n',function() {
    //send to temp as it needs to be compiled
});

gulp.task('images',function(){
    return gulp.src(paths.src+'/assets/img/**/*').pipe(gulp.dest(paths.dist+'/img/'));
});

gulp.task('bootstrapfonts',function() {
    return gulp.src('bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}').pipe(gulp.dest(paths.dist+'/fonts/'));
});

gulp.task('clean',function(done) {
    $.del([paths.dist+'/',paths.tmp+'/'],done);
});

gulp.task('build',['images','bootstrapfonts']);