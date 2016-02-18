'use strict';

var gulp = require('gulp');
require('require-dir')('./gulp');

gulp.paths = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp'
};

gulp.task("default",function(){
    gulp.start("build");
});