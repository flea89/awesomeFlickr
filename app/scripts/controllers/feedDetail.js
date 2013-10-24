angular.module('potatoFlickrApp')
    .controller('FeeddetailCtrl', ['$scope', 'feed', function ($scope, feed) {
        'use strict';
        $scope.feed = feed;
        //    $scope.feed.unsafeHtml = $sce.trustAsHtml(feed.description);
    }]);