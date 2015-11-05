var app = angular.module('myApp', [
    'ngRoute',
    'ngAudio',
    'ngTouch',
    'myApp.episodes',
    'myApp.audiobook',
    'myApp.audiobook-readalong',
    'myApp.readalong',
    'myApp.new-releases-recent-arrivals',
    'myApp.talk-to',
    'myApp.topic',
    'podcast-service',
    'participants-service'
]);

app.config(['$routeProvider', function provideRoutes($routeProvider) {
    'use strict';
    $routeProvider.otherwise({redirectTo: '/'});
}]);





