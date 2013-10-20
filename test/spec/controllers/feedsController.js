'use strict';




describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('potatoFlickrApp'));

    var feedsController,
        scope,
        $rootScope;
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q, _$rootScope_) {
        scope = $rootScope.$new();
        $rootScope = _$rootScope_;
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
            feeds: mockfeeds
        });
        $rootScope.$apply();
    }));
    
    it('should attach feeds to the scope', function () {
        expect(scope.feeds.length).toBe(2);
    });

    xit('should attach new feed to $scope.feeds', function () {
        scope.loadMore();
        $rootScope.$digest();
        expect(scope.feeds.length).toBe(4);
    });

});