var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var paths = {
  scripts: ['off-canvas.js']
}

gulp.task('default', function() {
  return gulp.src(paths.scripts)
    .pipe($.ngAnnotate())
    .pipe($.rename({suffix: '.min'}))
    .pipe($.uglify({mangle: false}))
    .pipe(gulp.dest('.'));
});
