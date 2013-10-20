'use strict';

angular.module('potatoFlickrApp')
    .directive('previewPost', function () {
    return {
        templateUrl: 'directivesTemplates/postPreview.html',
        restrict: 'A',
        scope: {
            imgUrl: '@'
        },
        link: function postLink(scope, element, attrs) {}
    };
});