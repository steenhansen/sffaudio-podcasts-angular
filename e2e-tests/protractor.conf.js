exports.config = {
    allScriptsTimeout: 11000,

    specs: [
       'directive-audiobook/*.js',
//     'directive-audiobook/back-forward.js',
//     'directive-audiobook/links-back.js',
//     'directive-audiobook/play-pause.js',
//     'directive-audiobook/slider.js',
//     'directive-audiobook/speed.js',


        'episodes/*.js',
//      'episodes/a-new-releases.js',
//      'episodes/a-readalong.js',
//      'episodes/a-talk-to.js',
//      'episodes/a-topic.js',
//      'episodes/an-audiobook.js',
//      'episodes/an-audiobook-readalong.js',

//      'episodes/list-filters.js',
//      'episodes/list-search.js',
//      'episodes/sort.js',


        'podcast/*.js',
//      'podcast/audiobook.js',
//      'podcast/audiobook-readalong.js',
//      'podcast/podcast-local-info.js'
//      'podcast/new-releases.js',
//      'podcast/readalong.js',
//      'podcast/talk-to.js',
//      'podcast/topic.js',

    ],

    capabilities: {
        'browserName': 'firefox'            // NB Chrome does not allow seeking on local mp3s via Node.js
    },

    baseUrl: 'http://localhost:8000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000
    }
};
