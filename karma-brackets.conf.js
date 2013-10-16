module.exports = function (config) {
    'use strict';
    config.set({
        basePath: '.',
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/scripts/*.js',
            'app/scripts/**/*.js',
            'test/mock/**/*.js',
            'test/spec/**/*.js'
        ],
        reporters: ['progress', 'brackets'],
        frameworks: ['jasmine'],
        port: 9876,
        runnerPort: 9100,
        colors: true,
        autoWatch: true,
        browsers: ['Chrome', 'PhantomJS'],
        captureTimeout: 60000,
        singleRun: false
    });
};