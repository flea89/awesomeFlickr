'use strict';

angular.module('potatoFlickrApp')
    .controller('MainCtrl', function ($scope, feeds) {
    feeds.getFeeds('potato').then(function(res) {
        $scope.awesomeThings = res;
    });
        
    $scope.loadMore = function(){
        feeds.loadMore();
    };
});