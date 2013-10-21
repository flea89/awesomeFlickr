'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('potatoFlickrApp'));

    var feedsController,
        scope,
        $rootScope;
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $q, _$rootScope_) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        var mockfeeds = {
            getFeeds: function () {
                var defer = $q.defer();
                defer.resolve([
                    {
                        title: 'title one'
                    },
                    {
                        title: 'title two'
                    }
                ]);
                return defer.promise;
            },
            loadMore: function () {
                var defer = $q.defer();
                defer.resolve([
                    {
                        title: 'title three'
                    },
                    {
                        title: 'title four'
                    }
                ]);
                return defer.promise;
            }
        };

        feedsController = $controller('feedsController', {
            $scope: scope,
            feedService: mockfeeds,
            feeds: [{},{}]
        });
    }));
    
    it('should attach feeds to the scope', function () {
        expect(scope.feeds.length).toBe(2);
    });

    it('should attach new feed to $scope.feeds', function () {
        scope.loadMore();
        $rootScope.$apply();
        expect(scope.feeds.length).toBe(4);
    });

});