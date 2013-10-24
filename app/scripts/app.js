'use strict';

angular.module('potatoFlickrApp', ['ngRoute', 'ngAnimate', 'ngSanitize'])
    .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'views/main.html',
        controller: 'feedsController',
        resolve: {
            feeds: ['feedService', function (feedService) {
                return feedService.getFeeds('');
            }]
        }
    })
        .when('/feedDetail/:feedIndex', {
        templateUrl: 'views/feedDetail.html',
        controller: 'FeeddetailCtrl',
        resolve: {
            feed: ['feedService','$route', function (feedService, $route) {
                return feedService.getFeed($route.current.params.feedIndex);
            }]
        }
    })
        .otherwise({
        redirectTo: '/'
    });
}]);

angular.module('potatoFlickrApp').run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$locationChangeSuccess', function (event, next, current) {
            if (next.match(/\/feedDetail\//)) {
                $rootScope.animationDirection = 'reverse';
            } else {
                $rootScope.animationDirection = '';
            }
        });

        $rootScope.$on('$routeChangeError', function (event, next, current) {
            $location.path('/');
        });
    }]);