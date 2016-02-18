var gulp = require('gulp');
//var googlecdn = require('gulp-google-cdn');
var html5Lint = require('gulp-html5-lint');
var jslint = require('gulp-jslint');

gulp.task('htmllint', function() {
    return gulp.src('./public/*.html')
        .pipe(html5Lint());
});

gulp.task('jslint', function () {
    return gulp.src(['./public/*.js'])
        .pipe(jslint({
            reporter: function (evt) {
                var msg = ' ' + evt.file;

                if (evt.pass) {
                    msg = '[PASS]' + msg;
                } else {
                    msg = '[FAIL]' + msg;
                }

                console.log(msg);
            }
        }));
});

// create a TASK to WATCH for changes in your files
// this will "watch" for any changes in your files and rerun gulp if necessary
gulp.task('watch', function() {
    gulp.watch(['./public/*.html'], ['htmllint']);
    gulp.watch(['./public/*.js'], ['jslint']);
});

// finally, create a TASK that will run all commands when typing "gulp"
// in Terminal

gulp.task('default', ['htmllint', 'jslint', 'watch'], function() {});