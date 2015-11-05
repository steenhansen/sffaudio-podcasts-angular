var filter_list = angular.module('myApp.episodes', ['ngRoute']);

filter_list.config(['$routeProvider', function filterListConfig($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/podcast_views/episodes/episodes.min.html',
        controller: 'EpisodesCtrl'
    });
}]);

filter_list.directive('myFilterSearchButtons', function () {
    return {
        templateUrl: '/podcast_views/episodes/my-filter-search-buttons.min.html'
    };
});


filter_list.controller('EpisodesCtrl', ['$scope','podcastService', 'participantsService', '$location', '$anchorScroll', '$timeout', '$interval',
    function EpisodesController($scope, podcastService, participantsService, $location, $anchorScroll, $timeout, $interval) {
        'use strict';

        $scope.turnFiltersOff = function () {
            $scope.highlight_kind_filter = false;
            $scope.limit_kind = '';
            $scope.highlight_participant_filter = false;
            $scope.limit_participant = '';
            $scope.highlight_played_filter = false;
            $scope.limit_played = '';
        };

        $scope.turnSortsOff = function () {
            $scope.highlight_kind_sort = false;
            $scope.highlight_id_sort = false;
            $scope.highlight_hh_mm_ss_length_sort = false;
            $scope.highlight_narrator_sort = false;
            $scope.highlight_book_sort = false;
            $scope.highlight_author_sort = false;
            $scope.highlight_local_play_state_sort = false;
        };

        $scope.limitAudiobookTypes = function (order_type) {
            var limit_book;
            if ('narrator_sort' === order_type) {
                limit_book = ':::Audiobook';
            } else if ('book_sort' === order_type) {
                limit_book = ':::Audiobook';
            } else if ('author_sort' === order_type) {
                limit_book = ':::Audiobook';
            } else {
                limit_book = '';
            }
            return limit_book;
        };

        $scope.flipSortDirection = function (order_type) {
            this.turnSortsOff();
            $scope.limit_book = this.limitAudiobookTypes(order_type);

            if ('kind' === order_type) {
                $scope.highlight_kind_sort = true;
            } else if ('padded_podcast_id' === order_type) {
                $scope.highlight_id_sort = true;
            } else if ('hh_mm_ss_length' === order_type) {
                $scope.highlight_hh_mm_ss_length_sort = true;
            } else if ('narrator_sort' === order_type) {
                $scope.highlight_narrator_sort = true;
            } else if ('book_sort' === order_type) {
                $scope.highlight_book_sort = true;
            } else if ('author_sort' === order_type) {
                $scope.highlight_author_sort = true;
            } else if ('local_play_state' === order_type) {
                $scope.highlight_local_play_state_sort = true;
            } else {
                order_type = 'padded_podcast_id';
                $scope.order_directions[order_type] = '+';
            }
            var changed_ordering = this.orderDirection(order_type);
            return changed_ordering;
        };

        $scope.filterHighlight = function (filter_id, filter_selection) {
            if ('audio-limit-type' === filter_id) {
                if ('all-type' === filter_selection) {
                    $scope.highlight_kind_filter = false;
                } else {
                    $scope.highlight_kind_filter = true;
                }
            } else if ('audio-limit-participant' === filter_id) {
                if ('all-type' === filter_selection) {
                    $scope.highlight_participant_filter = false;
                } else {
                    $scope.highlight_participant_filter = true;
                }
            } else if ('audio-limit-played' === filter_id) {
                if ('all-type' === filter_selection) {
                    $scope.highlight_played_filter = false;
                } else {
                    $scope.highlight_played_filter = true;
                }
            } else if ('search-query' === filter_id) {
                // do nothing
            } else {
                this.turnFiltersOff();
                $scope.search_query = '';
            }
            this.flipSortDirection('none');
        };



        $scope.orderDirection = function (order_type) {
            var direction = $scope.order_directions[order_type];
            if ('+' === direction) {
                $scope.order_directions[order_type] = '-';
            } else {
                $scope.order_directions[order_type] = '+';
            }
            var changed_ordering = $scope.order_directions[order_type] + order_type;
            return changed_ordering;
        };

        $scope.order_directions = {'kind': '+', 'padded_podcast_id': '+'};

        var last_anchor = podcast_module.getLocalValue('last_podcast_name');
        if (last_anchor) {
            podcast_module.startWaitToScroll(last_anchor, $location, $anchorScroll, $interval);
        }

        $scope.PARTICIPANT_DELIMITER = episodes_module.FILTER_DELIMITERS.PARTICIPANT_DELIMITER;
        $scope.KIND_DELIMITER = episodes_module.FILTER_DELIMITERS.KIND_DELIMITER;
        $scope.PLAY_STATE_DELIMITER = episodes_module.FILTER_DELIMITERS.PLAY_STATE_DELIMITER;
        $scope.the_podcasts = podcastService.query({episode_json_filename: 'view_all.json'},
            function success(the_episodes) {
                angular.forEach(the_episodes, function extractEpisodes(an_episode, key) {
                    var podcast_id = an_episode.padded_podcast_id;
                    an_episode.the_padded_podcast_id = '#' + podcast_id;
                    var local_play_state = podcast_module.localPodcastPlayState(podcast_id);
                    var local_play_state_sort = podcast_module.localPodcastPlayStatePadded(podcast_id, $scope.PLAY_STATE_DELIMITER);
                    an_episode.local_play_state = local_play_state;
                    an_episode.local_play_state_sort = local_play_state_sort;
                    an_episode.display_kind = an_episode.kind;
                    an_episode.filter_kind = $scope.KIND_DELIMITER + an_episode.kind + $scope.KIND_DELIMITER;
                    an_episode.kind_fragment = episodes_module.slugifyString(an_episode.kind);
                    an_episode.with_participants = podcast_module.addWithToFront(an_episode.participants);
                    an_episode.delimited_participants = episodes_module.participantDelimitation(an_episode.participants, ',', $scope.PARTICIPANT_DELIMITER);
                });
                $scope.have_episode_error = false;
            },
            function err() {
                $scope.have_episode_error = true;
            });
        $scope.the_participants = participantsService.query({participantsId: 'view_participants'});
        $scope.is_mobile_show_header = podcast_module.servingMobilePodcasts();
        $scope.limit_book = '';
        $scope.turnFiltersOff();
        $scope.filterHighlight('none');
        $scope.the_kinds = episodes_module.PODCAST_KINDS;
        $scope.played_states = episodes_module.PLAYED_STATES;

    }]);


