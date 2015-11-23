var real_gulp = require('gulp');
var gulp = require('gulp-help')(real_gulp);
var gulpSequence = require('gulp-sequence');
var tslint = require('gulp-tslint');
var tsConfigFiles = require('gulp-tsconfig-files');
var watch = require('./tools/build/watch');
var del = require('del');
var jasmine = require('gulp-jasmine');
var ts = require('gulp-typescript');
var print = require('gulp-print');
var KarmaServer = require('karma').Server;
var spawn = require('child_process').spawn;

var nodeDevServer;

var SERVER_PORT = 8080;
var TESTS_SERVER_PORT = 9000;

var tsServerFiles = require('./server/tsconfig.json').filesGlob;
var tsClientFiles = require('./client/tsconfig.json').filesGlob;

var tsServerProject = ts.createProject('./server/tsconfig.json');
var tsClientProject = ts.createProject('./client/tsconfig.json');

function spawnNode(port) {
  var node = spawn('node', ['server.js', `--port=${port}`], {stdio: 'inherit'});

  node.on('close', code => {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });

  return node;
}

function runNode(node, port) {
  if (node)
    node.kill();

  node = spawnNode(port);
  return node;
}

function runKarma(done, liveMode) {
  var nodeTestsServer = spawnNode(TESTS_SERVER_PORT);

  new KarmaServer({
    configFile: __dirname + '/client/karma.conf.js',
    singleRun: !liveMode,
    browsers: [liveMode ? 'Chrome' : 'PhantomJS']
  }, () => {
    nodeTestsServer.kill();
    done();
  }).start();
}

// tsconfig
gulp.task('update-tsconfig', 'Updates the tsconfig files by filesGlob', done => gulpSequence(['update-tsconfig-server', 'update-tsconfig-client'])(done));
gulp.task('update-tsconfig-server', false, () => gulp.src(tsServerFiles, {cwd: './server'}).pipe(tsConfigFiles({relative_dir:'./server', path:'./server/tsconfig.json'})));
gulp.task('update-tsconfig-client', false, () => gulp.src(tsClientFiles, {cwd: './client'}).pipe(tsConfigFiles({relative_dir:'./client', path:'./client/tsconfig.json'})));

// clean
gulp.task('clean', 'Cleans the generated files from build folder', done => gulpSequence(['clean-server', 'clean-client'])(done));
gulp.task('clean-server', false, (done) => del('./server/build', done));
gulp.task('clean-client', false, (done) => del('./client/build', done));

// copy client 3rd party to build folder
gulp.task('copy-client-3rd-party', false, () => gulp.src('./client/node_modules/**').pipe(gulp.dest('./client/build/node_modules')));

// copy client index.html to build folder
gulp.task('copy-index', false, () => gulp.src('./client/index.html').pipe(gulp.dest('./client/build')));

// copy client views *.html to build folder
gulp.task('copy-client-views', false, () => gulp.src('./client/src/**/view.html').pipe(gulp.dest('./client/build/src')));

gulp.task('client-copy', false, done => gulpSequence(['copy-index', 'copy-client-3rd-party', 'copy-client-views'])(done));

// tslint
gulp.task('tslint', 'Lint the TypeScript files', done => gulpSequence(['tslint-server', 'tslint-client'])(done));
gulp.task('tslint-server', false, () => gulp.src(tsServerFiles).pipe(tslint()));
gulp.task('tslint-client', false, () => gulp.src(tsClientFiles).pipe(tslint()));

// Tests
gulp.task('test', 'Runs the Server and Client Jasmine tests', done => gulpSequence('test-server', 'test-client')(done));
gulp.task('test-server', false, () => gulp.src('./build/**/*.test.js', {cwd: './server'}).pipe(jasmine()));
gulp.task('test-client', done => runKarma(done, false));
gulp.task('test-client-live', done => runKarma(done, true));

// TypeScript compiler
gulp.task('tsc', 'TypeScript the Server and the Client', done => gulpSequence(['tsc-server', 'tsc-client'])(done));
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

gulp.task('node-dev-server', () => runNode(nodeDevServer, SERVER_PORT));

gulp.task('watch', false, () => {
  watch('./client/src/**/view.html', {ignoreInitial: true}, 'copy-client-views');
  watch('./client/index.html', {ignoreInitial: true}, 'copy-index');
  watch('./client/src/**/*.ts', {ignoreInitial: true}, ['build-client', 'test-client']);
  watch('./server/src/**/*.ts', {ignoreInitial: true}, ['build-server', 'test-server', 'node-dev-server']);
});

gulp.task('build', 'build the client and the server', done => gulpSequence(['build-client', 'build-server'])(done));
gulp.task('build-server', 'Compiles the server TypeScript source files', done => gulpSequence('update-tsconfig-server', 'tslint-server', 'tsc-server')(done));
gulp.task('build-client', 'Compiles the client TypeScript source files', done => gulpSequence('update-tsconfig-client', 'tslint-client', 'tsc-client')(done));

gulp.task('serve', 'Build, run server and watch', done => gulpSequence('clean', 'build', 'client-copy', 'test', 'watch', 'node-dev-server')(done));
