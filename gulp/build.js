var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*','main-bower-files','del']
});

gulp.task("build",function(){
    gulp.src("bower_components/jquery/dist/jquery.js").pipe(gulp.dest("dist/js/"));
    gulp.src("bower_components/angular/angular.js").pipe(gulp.dest("dist/js/"));
    gulp.src("bower_components/bootstrap/dist/css/**").pipe(gulp.dest("dist/css/"));
    gulp.src("bower_components/bootstrap/dist/js/bootstrap.js").pipe(gulp.dest("dist/js/"));
    gulp.src("bower_components/bootstrap/dist/fonts/**").pipe(gulp.dest("dist/fonts/"));
});

gulp.task("clean",function(done) {
    $.del([paths.dist+"/",paths.tmp+"/"],done);
});