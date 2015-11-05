
app.directive('mySvgIcons', function includeSvgIcons() {
    'use strict';
    return {
        replace: false,
        templateUrl: '/podcast_views/svg-defs.svg'
    };
});

app.directive('audiobookPlayer', ['$interval', '$location', '$anchorScroll',
    function audiobookPlayerDirective($interval, $location, $anchorScroll) {
        'use strict';

        return {
            restrict: 'AE',
            scope: {
                the_audio_player: '=the_audio_player'         // NB <audiobook-player the_audio_player="audio_player_1">
            },
            replace: false,
            templateUrl: '/podcast_views/episode/my-audiobook-player.min.html',

            link: function audiobookPlayerLink(audio_scope, audiobook_element, html_template_attrs) {
                var the_player_name = html_template_attrs.theAudioPlayer;      // NB <audiobook-player the_audio_player="audio_player_1">
                var the_parent_scope = audio_scope.$parent[the_player_name];
                var the_podcast_id = the_parent_scope.podcast_id;
                var the_Server_Podcast = the_parent_scope.Server_Podcast;
                var the_ng_Audio = the_parent_scope.ng_Audio;
                var episode_json_filename = 'view_' + the_podcast_id + '.json';
                the_Server_Podcast.get({episode_json_filename: episode_json_filename},
                    function success(an_episode) {
                        getTimePosition(the_podcast_id);
                        initializeAudio(an_episode);
                        passInfoBackToParent(an_episode);
                    },
                    function err() {
                        audio_scope.download_path = '#/';
                        audio_scope.the_word_press_post = '#/';
                        audio_scope.the_twitter = '#/';
                        audio_scope.have_error = true;
                    }
                );

                function getTimePosition(podcast_id) {
                    var local_audio_seconds = podcast_module.getCurrentSeconds(podcast_id);
                    var local_duration_seconds;
                    if (-1 == local_audio_seconds) {
                        local_audio_seconds = 0;
                    }
                    audio_scope.my_currentTime = local_audio_seconds;
                    if (angular.isNumber(local_audio_seconds)) {
                        local_duration_seconds = podcast_module.getDurationLength(podcast_id);
                    } else {
                        local_duration_seconds = 0;
                    }
                    if (0 === local_duration_seconds) {
                        audio_scope.my_audio_progress = 0;
                    } else {
                        audio_scope.my_audio_progress = local_audio_seconds / local_duration_seconds;
                    }
                }

                function initializeAudio(audio_episode) {
                    audio_scope.download_path = 'http://' + podcast_module.PODCAST_URL_FOLDER + audio_episode.download_name;
                    audio_scope.audio = the_ng_Audio.load(audio_scope.download_path);
                    audio_scope.audio.volume = 1;
                    audio_scope.audio.playbackRate = 1;
                    audio_scope.first_play = true;
                    audio_scope.play_button_text = 'Play';
                    audio_scope.previous_my_currentTime = 0;
                    audio_scope.busy_waiting = false;
                    audio_scope.the_participants = podcast_module.addWithToFront(audio_episode.participants);
                    audio_scope.the_padded_podcast_id = audio_episode.padded_podcast_id;
                    audio_scope.the_book_display = audio_episode.book_display;
                    audio_scope.the_author_display = audio_episode.author_display;
                    audio_scope.the_narrator_display = audio_episode.narrator_display;
                    audio_scope.the_hh_mm_ss_length = audio_episode.hh_mm_ss_length;
                    audio_scope.the_word_press_post = audio_episode.word_press_post;
                    audio_scope.the_twitter = "https://twitter.com/intent/tweet?" + audio_episode.twitter;
                    audio_scope.have_error = false;
                }

                function passInfoBackToParent(the_episode) {
                    the_parent_scope.the_about_display = the_episode.about_display;
                    the_parent_scope.the_participants = the_episode.participants;
                    the_parent_scope.the_padded_podcast_id = the_episode.padded_podcast_id;
                    the_parent_scope.the_hh_mm_ss_length = the_episode.hh_mm_ss_length;
                    the_parent_scope.the_author_display = the_episode.author_display;
                    the_parent_scope.the_book_display = the_episode.book_display;
                    the_parent_scope.the_narrator_display = the_episode.narrator_display;
                }

                audio_scope.gotoHomeUrl = function gotoHomeUrlTouch() {
                    $location.path('#/');
                };

                audio_scope.gotoDownloadUrl = function gotoDownloadUrlTouch() {
                    window.location = audio_scope.download_path;
                };
                audio_scope.gotoWordPressUrl = function gotoWordPressUrlTouch() {
                    window.location = audio_scope.the_word_press_post;
                };
                audio_scope.gotoTwitterUrl = function gotoTwitterUrlTouch() {
                    window.location = audio_scope.the_twitter;
                };

                audio_scope.pressPlayPause = function playPausePress() {
                    if (audio_scope.audio) {
                        if (audio_scope.audio.paused) {
                            if (audio_scope.first_play) {
                                audio_scope.first_play = false;
                                audio_scope.audio.currentTime = audio_scope.my_currentTime;
                            }
                            audio_scope.audio.play();
                            audio_scope.play_button_text = 'Pause';
                        } else {
                            audio_scope.audio.pause();
                            audio_scope.play_button_text = 'Play';
                        }
                    } else {
                        audio_scope.have_error = true;
                    }
                };

                audio_scope.moveForwardSeconds = function moveSecondsForward(forward_seconds) {
                    var new_currentTime = audio_scope.audio.currentTime + forward_seconds;
                    if ((0 < new_currentTime) && (new_currentTime < audio_scope.audio.duration)) {
                        audio_scope.audio.currentTime = new_currentTime;
                        audio_scope.my_currentTime = new_currentTime;
                    }
                    audio_scope.first_play = false;
                };

                audio_scope.moveMyProgressSlider = function MoveProgressSlider() {
                    if (0.002 > audio_scope.my_audio_progress) {            // if slide all the way to the left, set to 0 seconds, not 42.43 seconds
                        audio_scope.my_currentTime = 0;
                        audio_scope.audio.currentTime = 0;
                        audio_scope.my_audio_progress = 0;
                        podcast_module.setCurrentSeconds(the_podcast_id, 0);
                    }
                    audio_scope.audio.progress = audio_scope.my_audio_progress;
                    audio_scope.first_play = false;
                };

                // ngAudio insists on always starting audio at the 0 seconds. Thus 0 seconds has to be hidden from user when
                // restarting files from localstorage positions. So my_currentTime is the visible integer wrapper for
                // ngAudio.currentTime. my_audio_progress wraps the hidden ngAudio.progress slider.
                //
                // Since audio duration is not known until file has been read in, we store it locally once known, for correct progress
                audio_scope.$watch("audio.currentTime", function watchCurrentTime(currentTime) {
                    if (currentTime) {
                        if (angular.isNumber(currentTime)) {    // only accept times bigger than 0 seconds, which indicate playing
                            if (0 === audio_scope.audio.remaining) {
                                podcast_module.setFinishedState(the_podcast_id);
                            } else {
                                audio_scope.my_currentTime = currentTime;
                                podcast_module.setCurrentSeconds(the_podcast_id, currentTime);
                                podcast_module.setDurationLength(the_podcast_id, audio_scope.audio.duration);
                                audio_scope.my_audio_progress = audio_scope.audio.progress;
                            }
                        }
                    }
                });

                function checkIfAudioStuck() {
                    if (!isFinite(audio_scope.my_currentTime)) {
                        audio_scope.have_error = true;
                    } else if (0 === audio_scope.my_currentTime) {
                        if (isFinite(audio_scope.audio.duration)) {
                            audio_scope.have_error = false;
                        } else {
                            audio_scope.have_error = true;
                        }
                    } else {
                        if (audio_scope.previous_my_currentTime === audio_scope.my_currentTime) {
                            audio_scope.busy_waiting = true;
                            return;
                        }
                    }
                    audio_scope.busy_waiting = false;
                    audio_scope.previous_my_currentTime = audio_scope.my_currentTime;
                }

                audio_scope.stop_check_audio_stuck = $interval(checkIfAudioStuck, 1000);

                audiobook_element.on('$destroy', function destroyAudiobook() {
                    $interval.cancel(audio_scope.stop_check_audio_stuck);
                    if (!angular.isUndefined(audio_scope.audio)) {
                        if (audio_scope.audio.canPlay) {
                            audio_scope.audio.stop();
                        }
                        audio_scope.audio.unbind();
                    }
                });

                var is_mobile_podcast = podcast_module.servingMobilePodcasts();
                if (!is_mobile_podcast) {
                    podcast_module.startWaitToScroll('top_podcast_play', $location, $anchorScroll, $interval);
                }

            }
        };
    }]);

