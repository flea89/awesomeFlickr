'use strict';

angular.module('potatoFlickrApp')
    .controller('FeeddetailCtrl', ['$scope', 'feed', '$sce', function ($scope, feed, $sce) {
        $scope.feed = feed;
        //    $scope.feed.unsafeHtml = $sce.trustAsHtml(feed.description);
    }]);