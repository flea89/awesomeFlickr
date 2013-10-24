'use strict';

angular.module('potatoFlickrApp')
    .controller('FeeddetailCtrl', ['$scope', 'feed', function ($scope, feed) {
        $scope.feed = feed;
        //    $scope.feed.unsafeHtml = $sce.trustAsHtml(feed.description);
    }]);