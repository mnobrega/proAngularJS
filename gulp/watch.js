'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

gulp.task('watch', ['inject','translations'], function () {
  gulp.watch([
    paths.src + '/*.html',
    paths.src + '/{app,components}/**/*.less',
    paths.src + '/{app,components}/**/*.js',
    paths.src + '/assets/i18n/*.po',
    'bower.json'
  ], ['inject','translations']);
});
