// Karma configuration
// Generated on Fri Dec 27 2013 10:23:12 GMT-0200 (BRST)

module.exports = function(config) {
  config.set({
    basePath: './',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'off-canvas.js',
      'off-canvas.spec.js'
    ],

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
        'karma-junit-reporter',
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-jasmine'
    ],

    reporters: ['progress'],

    autoWatch: true

  });
};
