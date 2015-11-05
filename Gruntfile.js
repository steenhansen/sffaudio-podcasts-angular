module.exports = function(grunt) {

    grunt.initConfig({

            jshint: {
                all: [
                    "podcast_components/app.js",
                    "podcast_components/local-storage-value.js",
                    "podcast_components/object-create.js",
                    "podcast_components/podcast/podcast-service.js",
                    "podcast_components/participants/participants-service.js",

                    "podcast_views/episodes/episodes.js",
                    "podcast_views/episodes/episodes-module.js",

                    "podcast_views/episode/podcast-local-info.js",
                    "podcast_views/episode/audiobook-directive.js",

                    "podcast_views/episode/audiobook/audiobook.js",
                    "podcast_views/episode/audiobook-readalong/audiobook-readalong.js",
                    "podcast_views/episode/new-releases-recent-arrivals/new-releases-recent-arrivals.js",
                    "podcast_views/episode/readalong/readalong.js",
                    "podcast_views/episode/talk-to/talk-to.js",
                    "podcast_views/episode/topic/topic.js"

                ]
            },

            uglify: {
                my_target : {
                    options : {
                        sourceMap : true,
                        sourceMapName : 'sourceMap.map',
                        compress:{
                           // drop_console: true         // anuglar has one
                        }
                    },
                    files : {
                        'podcast_views/all.min.js' : [
                            'podcast_bower/angular/angular.js',
                            'podcast_bower/angular-route/angular-route.js',
                            'podcast_bower/angular-audio/app/angular.audio.js',
                            "podcast_bower/angular-resource/angular-resource.js",
                            "podcast_bower/angular-touch/angular-touch.js",

                            "podcast_components/app.js",
                            "podcast_components/local-storage-value.js",
                            "podcast_components/object-create.js",
                            "podcast_components/podcast/podcast-service.js",
                            "podcast_components/participants/participants-service.js",

                            "podcast_views/episodes/episodes.js",
                            "podcast_views/episodes/episodes-module.js",

                            "podcast_views/episode/podcast-local-info.js",
                            "podcast_views/episode/audiobook-directive.js",

                            "podcast_views/episode/audiobook/audiobook.js",
                            "podcast_views/episode/audiobook-readalong/audiobook-readalong.js",
                            "podcast_views/episode/new-releases-recent-arrivals/new-releases-recent-arrivals.js",
                            "podcast_views/episode/readalong/readalong.js",
                            "podcast_views/episode/talk-to/talk-to.js",
                            "podcast_views/episode/topic/topic.js"

                            ]
                    }
                }
            },

        // https://github.com/FWeinb/grunt-svgstore/issues/77
        // can fix the FireFox 'prefix not bound to a namepsace' error message
            svgstore: {
                options: {
                  //  includedemo: true,        //this will make a sample html file to show how it works
                    prefix : 'shape-',
                    //svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
                    //    viewBox : '0 0 48 48',
                    //    xmlns: 'http://www.w3.org/2000/svg'
                    //},
                    //symbol: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
                    //    viewBox : '0 0 48 48'
                    //}
                },
                default : {
                    files: {
                        'podcast_views/svg-defs.svg': ['podcast_svg/*.svg']
                    }
                }

            },

        htmlhint: {
            html1: {
                options: {
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-no-duplication': true,
                    'tag-pair': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'src-not-empty': true,
                    'title-require': true,

                    'tag-self-close': false,
                    'doctype-first': false,
                    'attr-value-double-quotes': false,
                    'attr-value-not-empty': false
                },
                src: ['podcast_views/**/*.html']
            },
            html2: {
                options: {
                    'tag-pair': true
                },
                src: ['*.html']
            }
        },


        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'podcast_views/episodes/my-filter-search-buttons.min.html': 'podcast_views/episodes/my-filter-search-buttons.html',

                    'podcast_views/episodes/episodes.min.html': 'podcast_views/episodes/episodes.html',

                    'podcast_views/episode/my-audiobook-player.min.html': 'podcast_views/episode/my-audiobook-player.html',

                    'podcast_views/episode/audiobook/audiobook.min.html':
                    'podcast_views/episode/audiobook/audiobook.html',

                    'podcast_views/episode/audiobook-readalong/audiobook-readalong.min.html':
                    'podcast_views/episode/audiobook-readalong/audiobook-readalong.html',

                    'podcast_views/episode/new-releases-recent-arrivals/new-releases-recent-arrivals.min.html':
                    'podcast_views/episode/new-releases-recent-arrivals/new-releases-recent-arrivals.html',

                    'podcast_views/episode/readalong/readalong.min.html':
                    'podcast_views/episode/readalong/readalong.html',

                    'podcast_views/episode/talk-to/talk-to.min.html':
                    'podcast_views/episode/talk-to/talk-to.html',

                    'podcast_views/episode/topic/topic.min.html':
                    'podcast_views/episode/topic/topic.html'


                }
            }
        },

        sass: {
            options: {
                //   sourceMap: true
            },
            dist: {
                files: {
                    'podcast_svg/svg-icons.css': 'podcast_svg/svg-icons.scss',
                    'podcast_views/css/app.css': 'podcast_views/css/app.scss',
                    'podcast_views/episodes/my-filter-search.css': 'podcast_views/episodes/my-filter-search.scss',
                    'podcast_views/episode/my-audiobook-player.css': 'podcast_views/episode/my-audiobook-player.scss'
                }
            }
        },

        csslint: {
            strict: {
                options: {
                 //   import: 2
                },
                src: ['podcast_svg/svg-icons.css',
                    //   'podcast_views/css/app.css',                        // complains too much about angular cloaking css
                    'podcast_views/episodes/my-filter-search.css',
                    'podcast_views/episode/my-audiobook-player.css']
            },
              },

        concat_css: {
            options: { },
            all: {
                src: ["podcast_views/**/*.css", "podcast_svg/*.css", '!podcast_views/css/all.concat.css', '!podcast_views/css/all.min.css'],
                dest: "podcast_views/css/all.concat.css"
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'podcast_views/css',
                    src: ['all.concat.css'],
                    dest: 'podcast_views/css',
                    ext: '.min.css'
                }]
            }
        },
        'cache-busting': {
            css: {
                replace: ['*.html'],
                replacement: 'all.min.css',
                file: 'podcast_views/css/all.min.css',
                get_param: true
            }
        },

        'cache-busting': {
            js: {
                replace: ['*.html'],
                replacement: 'all.min.js',
                file: 'podcast_views/all.min.js',
                get_param: true
            }
        },



        watch: {
            js: {
                files: ['podcast_components/**/*.js', 'podcast_views/**/*.js'],
                tasks: ['uglify', 'jshint', 'cache-busting']
            },
            svg:{
                files: ['podcast_svg/*.svg'],
                tasks: ['svgstore']
            },
            html:{
                files: ['podcast_views/**/*.html', '*.html', '!podcast_views/**/*min.html'],
                tasks: ['htmlhint', 'htmlmin']
            },
            css: {
                files: ['podcast_svg/**/*.scss', 'podcast_views/**/*.scss' ],
                tasks: ['sass', 'csslint', 'concat_css', 'cssmin', 'cache-busting']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-cache-busting');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify', 'svgstore', 'htmlhint', 'htmlmin', 'sass', 'csslint', 'concat_css', 'cssmin', 'cache-busting']);

};