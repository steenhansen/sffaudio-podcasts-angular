var audiobook_module = angular.module('myApp.audiobook', ['ngRoute']);

audiobook_module.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/audiobook/:id', {
        templateUrl: '/podcast_views/episode/audiobook/audiobook.min.html',
        controller: 'AudiobookCtrl'
    });
}]);

audiobook_module.controller('AudiobookCtrl', ['$scope', '$routeParams', 'podcastService', 'ngAudio',
    function audiobookController($scope, $routeParams, podcastService, ngAudio) {
        'use strict';

        $scope.audio_player_1 = {        // NB <audiobook-player the_audio_player="audio_player_1">
            podcast_id: $routeParams.id,
            Server_Podcast: podcastService,
            ng_Audio: ngAudio,
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

