var exec = require('child_process').exec;
var real_gulp = require('gulp');
var gulp = require('gulp-help')(real_gulp);
var gulpSequence = require('gulp-sequence');
var tslint = require('gulp-tslint');
var tsConfigFiles = require('gulp-tsconfig-files');
var watch = require('./tools/build/watch');
var del = require('del');
var jasmine = require('gulp-jasmine');
var nodemon = require('gulp-nodemon');

var tsServerFiles = require('./server/tsconfig.json').filesGlob;
var tsClientFiles = require('./client/tsconfig.json').filesGlob;

gulp.task('update_tsconfig', false, () => {
  gulp.src(tsServerFiles).pipe(tsConfigFiles());
  gulp.src(tsClientFiles).pipe(tsConfigFiles());
});

gulp.task('clean', 'Cleans the generated files from build folder', ['clean-server', 'clean-client']);
gulp.task('clean-server', null, (done) => del('./server/build', done));
gulp.task('clean-client', null, (done) => del('./client/build', done));

gulp.task('tslint', 'Lints all TypeScript source files', () => {
  return gulp.src(tsServerFiles)
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('tsc', 'Compiles all TypeScript files', (cb) => {
  exec('tsc', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('build', 'Compiles all TypeScript source files', gulpSequence('update_tsconfig', 'tslint', 'tsc'));

gulp.task('test-server', 'Runs the Server Jasmine test specs', () => {
  return gulp.src('./server/build/*.test.js')
    .pipe(jasmine());
});

gulp.task('build_and_test', false, gulpSequence('build', 'test-server'));

gulp.task('serve', 'Build, run server and watch', gulpSequence('clean', 'build', 'test-server', 'nodemon'));

gulp.task('nodemon', function () {
  nodemon({ script: './server.js'
    , ext: 'ts'
    , ignore: ['node_modules', 'build', 'tools']
    , tasks: ['build_and_test'] })
});
