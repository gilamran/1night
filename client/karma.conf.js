'use strict';

module.exports = function (config) {
  config.set({
    plugins: ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-ng-html2js-preprocessor'],

    // base path, that will be used to resolve files and exclude
    basePath: 'build',

    // testing framework to use (jasmine/mocha/qunit/...)
    preprocessors: {
      'src/**/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'OneNightApp'
    },

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/socket.io-client/socket.io.js',
      'testUtils/jasmineMatchers.js',
      'src/Config/OneNightAppConfig-For-Tests.js',
      'testUtils/**/*.js',
      'src/**/*.js',
      'src/**/*.html'
    ],

    // list of files / patterns to exclude
    exclude: [
      'src/Config/OneNightAppConfig.js'
    ],

    // test results reporter to use
    // possible values: dots || progress || growl
    reporters: ['progress'],

    // web server port
    port: 8880,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    //browsers: ['Chrome'],
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
