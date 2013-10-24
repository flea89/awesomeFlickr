'use strict';

angular.module('potatoFlickrApp')
    .controller('FeeddetailCtrl', function ($scope, feed, $sce) {
    $scope.feed = feed;
    $scope.feed.unsafeHtml = $sce.trustAsHtml(feed.description);
});