'use strict';

angular.module('potatoFlickrApp')
    .controller('feedsController', function ($scope, feeds, feedService) {
    $scope.feeds = feeds;

    $scope.$watch('tag', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            feedService.getFeeds($scope.tag).then(function (pFeeds) {
                $scope.feeds = angular.copy(pFeeds);
                $scope.tagName = $scope.tag;
            });
        }
    });
        
    $scope.loadMore = function () {
        feedService.loadMore().then(function (res) {
            if (res.length === $scope.feeds.length) {
                $scope.noNewFeeds = true;
            } else {
                $scope.noNewFeeds = false;
            }
            $scope.feeds= res;
        });
    };
});