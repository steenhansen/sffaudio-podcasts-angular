var participants_service = angular.module('participants-service', ['ngResource']);


participants_service.factory('participantsService', ['$resource',
    function ($resource) {
        'use strict';

        var participants_resource = $resource('/podcast_components/participants/:participantsId.json', {}, {
            query: {method: 'GET', params: {participantsId: 'view_participants'}, isArray: true}
        });
        return participants_resource;
    }]);



