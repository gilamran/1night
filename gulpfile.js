var real_gulp = require('gulp');
var gulp = require('gulp-help')(real_gulp);
var gulpSequence = require('gulp-sequence');
var tslint = require('gulp-tslint');
var tsConfigFiles = require('gulp-tsconfig-files');
var watch = require('./tools/build/watch');
var del = require('del');
var jasmine = require('gulp-jasmine');
var nodemon = require('gulp-nodemon');
var ts = require('gulp-typescript');
var print = require('gulp-print');
var KarmaServer = require('karma').Server;

var tsServerFiles = require('./server/tsconfig.json').filesGlob;
var tsClientFiles = require('./client/tsconfig.json').filesGlob;

var tsServerProject = ts.createProject('./server/tsconfig.json');
var tsClientProject = ts.createProject('./client/tsconfig.json');

// tsconfig
gulp.task('update-tsconfig', 'Updates the tsconfig files by filesGlob', gulpSequence(['update-tsconfig-server', 'update-tsconfig-client']));
gulp.task('update-tsconfig-server', false, () => gulp.src(tsServerFiles, {cwd: './server'}).pipe(tsConfigFiles({relative_dir:'./server', path:'./server/tsconfig.json'})));
gulp.task('update-tsconfig-client', false, () => gulp.src(tsClientFiles, {cwd: './client'}).pipe(tsConfigFiles({relative_dir:'./client', path:'./client/tsconfig.json'})));

// clean
gulp.task('clean', 'Cleans the generated files from build folder', gulpSequence(['clean-server', 'clean-client']));
gulp.task('clean-server', false, (done) => del('./server/build', done));
gulp.task('clean-client', false, (done) => del('./client/build', done));

// copy client bower components to build folder
gulp.task('copy-bower', false, () => gulp.src('./client/bower_components/**').pipe(gulp.dest('./client/build/bower_components')));

// copy client index.html to build folder
gulp.task('copy-index', false, () => gulp.src('./client/index.html').pipe(gulp.dest('./client/build')));

// copy client views *.html to build folder
gulp.task('copy-client-views', false, () => gulp.src('./client/src/**/view.html').pipe(gulp.dest('./client/build/src')));

gulp.task('client-copy', false, gulpSequence(['copy-index', 'copy-bower', 'copy-client-views']));

// tslint
gulp.task('tslint', 'Lint the TypeScript files', gulpSequence(['tslint-server', 'tslint-client']));
gulp.task('tslint-server', false, () => gulp.src(tsServerFiles).pipe(tslint()));
gulp.task('tslint-client', false, () => gulp.src(tsClientFiles).pipe(tslint()));

// Tests
gulp.task('test', 'Runs the Server and Client Jasmine tests', gulpSequence('test-server', 'test-client'));
gulp.task('test-server', false, () => gulp.src('./build/**/*.test.js', {cwd: './server'}).pipe(jasmine()));
gulp.task('test-client', (done) => {
  new KarmaServer({
    configFile: __dirname + '/client/karma.conf.js',
    singleRun: true
  }, done).start();
});

// TypeScript compiler
gulp.task('tsc', 'TypeScript the Server and the Client', gulpSequence(['tsc-server', 'tsc-client']));
gulp.task('tsc-server', () => {
  return gulp.src(tsServerFiles, {cwd: './server'})
    .pipe(ts(tsServerProject))
    .js.pipe(gulp.dest('./server/build'));
});

gulp.task('tsc-client', () => {
  return gulp.src(tsClientFiles, {cwd: './client'})
    .pipe(ts(tsClientProject))
    .js.pipe(gulp.dest('./client/build'));
});


gulp.task('build', 'Compiles all TypeScript source files', gulpSequence('update-tsconfig', 'tslint', 'tsc'));

gulp.task('build_and_test', false, gulpSequence('build', 'test'));

gulp.task('serve', 'Build, run server and watch', gulpSequence('clean', 'build', 'client-copy', 'test', 'nodemon'));

gulp.task('nodemon', function () {
  nodemon({
    script: './server.js'
    , ext: 'ts'
    , ignore: ['node_modules', 'bower_components', 'build', 'tools']
    , tasks: ['build_and_test']
  })
});
