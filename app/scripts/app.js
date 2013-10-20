'use strict';

angular.module('potatoFlickrApp', ['potato.Services'])
    .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'views/main.html',
        controller: 'feedsController'
    })
        .otherwise({
        redirectTo: '/'
    });
});