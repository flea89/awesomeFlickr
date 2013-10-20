'use strict';

angular.module('potatoFlickrApp')
    .directive('previewPost', function () {
    return {
        templateUrl: 'directivesTemplates/postPreview.html',
        restrict: 'A',
        scope: {
            imgUrl: '@',
            title: '@',
            date: '@',
            authorName:'@'
        },
        link: function postLink(scope, element, attrs) {}
    };
});