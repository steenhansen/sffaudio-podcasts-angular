var new_releases_module = angular.module('myApp.new-releases-recent-arrivals', ['ngRoute']);

new_releases_module.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/new-releases-recent-arrivals/:id', {
        templateUrl: '/podcast_views/episode/new-releases-recent-arrivals/new-releases-recent-arrivals.min.html',
        controller: 'NewReleasesRecentArrivalsCtrl'
    });
}]);

new_releases_module.controller('NewReleasesRecentArrivalsCtrl', ['$scope', '$routeParams', 'podcastService', 'ngAudio',
    function newReleasesController($scope, $routeParams, podcastService, ngAudio) {
        'use strict';



        $scope.audio_player_1 = {     // NB <audiobook-player the_audio_player="audio_player_1">
            podcast_id : $routeParams.id,
            Server_Podcast : podcastService,
            ng_Audio : ngAudio,
            the_about_display: undefined,
            the_participants: undefined,
            the_padded_podcast_id: undefined,
            the_hh_mm_ss_length: undefined,
            the_author_display: undefined,
            the_book_display: undefined,
            the_narrator_display: undefined
        };

        //
        //$scope.audio_player_2 = {
        //    podcast_id: '316',
        //    Server_Podcast: ServerPodcasts,
        //    ng_Audio: ngAudio,
        //    the_about_display: undefined,
        //    the_participants: undefined,
        //    the_padded_podcast_id: undefined,
        //    the_hh_mm_ss_length: undefined,
        //    the_author_display: undefined,
        //    the_book_display: undefined,
        //    the_narrator_display: undefined
        //};

    }]);
