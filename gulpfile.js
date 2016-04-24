var gulp = require('gulp');
var clean = require('gulp-rimraf');
var jshint = require('gulp-jshint') || null;
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
// var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var lessify = require('gulp-less');
var jadeify = require('gulp-jade');
var path = require('path');

//Path variables
var curr = '.';
var dest = './dist';

var publicDir = {
  img: '/public/img/',
  css: '/public/css/',
  less: '/public/less/',
  js:  '/public/scripts/',
  views: '/public/views/'
}

//Vendor path var
var bowerDir = curr + '/public/libs/';

//BEFORE File type collected vars
var appFiles = {
  vendor:   [bowerDir + 'jquery/dist/*.min.js', bowerDir + '**/*.min.js'],
  js:       curr + publicDir.js + '**/*.js',
  combinedjs: ["./public/libs/jquery/dist/*.min.js","./public/libs/**/*.min.js", "./public/js/**/*.js"],
  css:      bowerDir + '**/*.min.css',
  less:     'public/less/*.less',
  misc:     [curr + '/app/**', curr + '/config/**'],
  server:   './server.js',
  views:    './public/views/**/*.html',
  jade:     [!curr + 'public/index.jade', curr + 'public/views/**/*.jade']
};

// TASKS ========================================================================

gulp.task('clean', function(){
  return gulp.src(dest + '/public/', {read: false}).pipe(clean());
});

gulp.task('lessify', function(){
  return gulp.src('./public/less/main.less')
    .pipe(lessify())
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/css/'))
});

gulp.task('jshint', function(){
  gulp.src([appFiles.server, './public/js/**/*.js']) //only js files, server
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  gulp.src(appFiles.misc)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('watch', function() {
  gulp.watch('./public/less/*.less', ['lessify', 'start'])
  gulp.watch('./public/js/**', ['jshint', 'start']);
  gulp.watch('.app/**/*.js', ['jshint', 'start']);
});

gulp.task('concat', function() {
  gulp.src(appFiles.combinedjs)// + ',' + appFiles.vendor)
    .pipe(concat('only.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/public/js/'));
});


gulp.task('default', ['jshint', 'clean', 'lessify', 'start', 'watch']);
gulp.task('produce', ['lessify', 'start'])
