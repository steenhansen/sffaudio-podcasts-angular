
var podcast_service = angular.module('podcast-service', ['ngResource']);

podcast_service.factory('podcastService', ['$resource',
    function ($resource) {
        'use strict';

        var podcast_resource = $resource('/podcast_components/podcast/:episode_json_filename',
            {},
            {query: {method: 'GET', isArray: true}});
        return podcast_resource;
    }]);

