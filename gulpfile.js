const gulp = require('gulp');
const mocha = require('gulp-mocha');
const clean = require('gulp-rimraf');
const jshint = require('gulp-jshint') || null;
const packageJSON = require('./package');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const watch = require('gulp-watch');
const minifyCss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const lessify = require('gulp-less');
const webpack = require('webpack-stream');
const rename = require('gulp-rename');
const jshintJSX = require('jshint-jsx')
const util = require('gulp-util');
// const jadeify = require('gulp-jade');
const path = require('path');

//Path variables
var curr = '.';
var dest = './build';

var publicDir = {
  imgs:   '/public/imgs/',
  less:   '/public/less/',
  static: '/public/index.html',
  js:     '/public/scripts',
  jsx:    ['/public/components', '/public/main.jsx']
}

//Vendor path var
var bowerDir = curr + '/public/libs/';

//BEFORE File type collected vars
var appFiles = {
  vendor:   [bowerDir + 'jquery/dist/*.min.js', bowerDir + '**/*.min.js'],
  routes:   'routes/**/*.js',
  js:       ['./config/**/*.js', 'routes/**/*.js', 'models/**/*.js', 'public/**/*.js', 'test/**/*.js'],
  less:     'public/less/*.less',
  misc:     [curr + '/app/**', curr + '/config/**'],
  server:   './server.js',
  test:     ['test-server/user_routes_test.js', 'test-server/event_routes_test.js']
};

// TASKS ========================================================================

gulp.task('test:server', () => {
  gulp.src(appFiles.test)
    .pipe(mocha());
});

gulp.task('clean', function(){
  console.log('CLEANING');
  return gulp.src(dest, {read: false})
      .pipe(clean())
      .pipe(gulp.dest(dest))
});

gulp.task('copy', function(){
  console.log('MOVING INDEX');
  return gulp.src('./public/index.html')
          .pipe(gulp.dest(dest))
});

gulp.task('lessify', function(){
  console.log('LESSIFYING');
  return gulp.src('./public/less/*.less')
    .pipe(lessify().on('error', util.log))
    .pipe(minifyCss())
    .pipe(gulp.dest(dest))
});

gulp.task('bundleit', function(){
  console.log('BUNDLING');
  return gulp.src('public/main.jsx')
      .pipe(webpack({
        watch: true,
        output: {
          filename: 'bundle.js'
        },
        module: {
          loaders: [
            {
              test: /.jsx?$/,
              loader: ['babel-loader'],
              exclude: /node_modules/,
              query: {
                presets: ['es2015', 'react']
              }
            }
          ]
        }
      }))
      .pipe(gulp.dest(dest))
});

gulp.task('jshint', function(){
  gulp.src(appFiles.js)
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
  gulp.src(publicDir.jsx)
      .pipe(jshint({ linter: require('jshint-jsx').JSXHINT }))
      .pipe(jshint.reporter('default'))
})

gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./public/less/*.less', ['lessify', 'start'])
  gulp.watch('./public/js/**', ['jshint', 'start']);
  gulp.watch(appFiles.js, ['jshint', 'start']);
  gulp.watch('./public/index.html', ['copy', 'start']);
});

// gulp.task('concat', function() {
//   gulp.src(appFiles.combinedjs)// + ',' + appFiles.vendor)
//     .pipe(concat('only.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('./dist/public/js/'));
// });


gulp.task('default', ['lessify', 'copy', 'bundleit', 'jshint', 'start', 'watch']);
gulp.task('produce', ['lessify', 'start'])
