'use strict';

angular.module('potatoFlickrApp')
    .controller('feedsController', function ($scope, feeds) {
    $scope.feeds = [];
    feeds.getFeeds('potato').then(function (pFeeds) {
        $scope.feeds = angular.copy(pFeeds);
    });

    $scope.loadMore = function () {
        feeds.loadMore().then(function (res) {
            res.forEach(function(feed){
                $scope.feeds.push(feed);
            });
        });
    };
});