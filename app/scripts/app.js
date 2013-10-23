'use strict';

angular.module('potatoFlickrApp', ['potato.Services', 'ngRoute', 'ngAnimate', 'ngSanitize'])
    .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'views/main.html',
        controller: 'feedsController',
        resolve: {
            feeds: function (feedService) {
                return feedService.getFeeds('');
            }
        }
    })
        .when('/feedDetail/:feedIndex', {
        templateUrl: 'views/feedDetail.html',
        controller: 'FeeddetailCtrl',
        resolve: {
            feed: function (feedService, $route) {
                return feedService.getFeed($route.current.params.feedIndex);
            }
        }
    })
        .otherwise({
        redirectTo: '/'
    });
});

angular.module('potatoFlickrApp').run(function ($rootScope) {
    $rootScope.$on("$locationChangeSuccess", function (event, next, current) {
        if (next.match(/\/feedDetail\//)) {
            $rootScope.animationDirection = 'reverse';
        } else {
            $rootScope.animationDirection = '';
        }
    });

});