var gulp         = require('gulp');

var browserSync  = require('browser-sync');
var reload       = browserSync.reload;
var watch        = require('gulp-watch');
var compass      = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function () {
	gulp.start('browser-sync');
	gulp.start('style');
	watch(['./**/*'], function(){
		reload();
	});
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir	: './',
			index	: 'index.html'
		},
		browser: 'google chrome'
	});
});

gulp.task('style', function(){
	watch('./scss/**/*.scss', function () {
		gulp.src('./scss/**/*.scss')
	        .pipe(compass({config_file : 'config.rb', css : 'css', sass : 'scss'}))
	        .on('error', onError)
	        .pipe(autoprefixer('last 2 versions'))
    		.pipe(gulp.dest('./css'));
	});
});

function onError(err) {
    console.log(err);
}