angular.module('potatoFlickrApp')
    .controller('feedsController', ['$scope', 'feeds', 'feedService', function ($scope, feeds, feedService) {

        'use strict';

        $scope.feeds = feeds;
        $scope.isLoading = false;
        $scope.$watch('tag', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.noNewFeeds = false;
                feedService.getFeeds($scope.tag).then(function (pFeeds) {
                    $scope.feeds = pFeeds;
                    $scope.tagName = $scope.tag;
                });
            }
        });

        $scope.loadMore = function () {
            $scope.isLoading = true;
            $scope.noNewFeeds = false;
            feedService.loadMore().then(function (res) {
                if (res.length === $scope.feeds.length) {
                    $scope.noNewFeeds = true;
                } else {
                    $scope.noNewFeeds = false;
                }
                $scope.isLoading = false;
                $scope.feeds = res;
            });
        };
    }]);