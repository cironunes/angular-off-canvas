var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var paths = {
  scripts: ['off-canvas.js']
}

gulp.task('default', function() {
  return gulp.src(paths.scripts)
    .pipe(ngAnnotate())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('.'));
});
