module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
        'podcast_views/**/**/*.js',
        'podcast_components/**/*.js',

        'podcast_bower/angular-route/angular-route.js',
        'podcast_bower/angular-resource/angular-resource.js',
        'podcast_bower/angular-mocks/angular-mocks.js',

        'test/unit/testEpisodeController.js',
        'test/unit/testLocalStorageValue.js',
        'test/unit/testPodcastLocalInfo.js',
        'test/unit/testServices.js',
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome',
             //'Firefox'
       ],

    plugins : [
            'karma-chrome-launcher',
           // 'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};