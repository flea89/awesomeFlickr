/*globals gapi:true */
angular.module('potatoFlickrApp')
    .directive('gplus', function () {
    'use strict';
    return {
        template: '<div class="google-plus"><div class="g-plusone" data-href="{{link}}" data-annotation="none" data-size="{{size}}"></div></div>',
        restrict: 'EA',
        scope: {
            link: '@',
            size: '@',
            annotation: '@'
        },
        replace: true,
        link: function postLink(scope, element, attrs) {
            gapi.plusone.go('google-plus');
        }
    };
});