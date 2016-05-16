var gulp = require('gulp');
var clean = require('gulp-rimraf');
var jshint = require('gulp-jshint') || null;
var packageJSON = require('./package');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
// var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var lessify = require('gulp-less');
var webpack = require('webpack-stream');
var rename = require('gulp-rename');
var jshintJSX = require('jshint-jsx')
// var jadeify = require('gulp-jade');
var path = require('path');

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
};

// TASKS ========================================================================

gulp.task('clean', function(){
  return gulp.src(dest, {read: false})
      .pipe(clean())
      .pipe(gulp.dest(dest))
});

gulp.task('copy'), function(){
  return gulp.src('./public/index.html')
          .pipe(gulp.dest(dest))
};

gulp.task('lessify', function(){
  return gulp.src(curr + publicDir.less)
    .pipe(lessify())
    // .pipe(minifyCss())
    .pipe(gulp.dest(dest))
});

gulp.task('bundleit', function(){
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


gulp.task('default', ['lessify', 'bundleit', 'jshint', 'start', 'watch', 'copy']);
gulp.task('produce', ['lessify', 'start'])
