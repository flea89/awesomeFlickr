'use strict';

angular.module('potatoFlickrApp')
    .directive('topbar', function ($rootScope, $location) {
    return {
        templateUrl: 'directivesTemplates/topbarTemplate.html',
        restrict: 'A',
        scope: {
            tag: '='
        },
        link: function postLink(scope, element, attrs) {
            scope.submit = function () {
                scope.tag = scope.search;
            };
            scope.enableSearch = true;
            $rootScope.$on('$routeChangeSuccess', function () {
                if ($location.path().match(/^\/feedDetail\//)) {
                    scope.enableSearch = false;
                } else{
                    scope.enableSearch = true;
                }
            });
        }
    };
});