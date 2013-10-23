describe('Service: feeds', function () {
    'use strict';

    var mockAuthorService = {
        addAuthorDetail: function (feed) {
            return feed;
        }
    };

    var feedsAsync = [{
            title: ' ',
            link: 'link1',
            date_taken: '2013-09-28T13:05:20-08:00',
            description: '  ',
            published: '2013-10-16T12:31:24Z',
        }, {
            title: ' ',
            link: 'link2',
            date_taken: '2013-09-28T13:05:20-08:00',
            description: '  ',
            published: '2013-10-16T12:31:24Z',
        }];
    var url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK&tags=potato&tagsMode=all';
    // load the service's module
    beforeEach(module('potato.Services'));
    beforeEach(function () {
        module(function ($provide) {
            $provide.value('authorService', mockAuthorService);
        });
    });

    // instantiate service
    var feedService, $httpBackend;


    beforeEach(inject(function (_feedService_) {
        feedService = _feedService_;
    }));

    it('should return an object', function () {
        expect(typeof feedService).toBe('object');
    });

    it('should return an object with property getFeeds, getFeed, loadMore of type function', function () {
        expect(typeof feedService.getFeeds).toBe('function');
        expect(typeof feedService.getFeed).toBe('function');
        expect(typeof feedService.loadMore).toBe('function');
    });


    describe('getFeeds', function () {
        var feedService, $q;

        beforeEach(inject(function (_$httpBackend_, _feedService_, _$q_, authorService) {
            feedService = _feedService_;
            $q = _$q_;
            $httpBackend = _$httpBackend_;
            $httpBackend.expectJSONP(url).
            respond({
                items: feedsAsync
            });
        }));


        it('should return a promise and fullfill it whith an array of 2 elements', function () {
            var feedsPromise = feedService.getFeeds('potato');
            var foo = {
                setBar: function () {}
            };
            spyOn(foo, 'setBar');
            feedsPromise.then(function (res) {
                foo.setBar();
                expect(typeof res).toBe('object');
                expect(Array.isArray(res)).toBe(true);
                expect(res.length).toBe(2);
            });
            expect(foo.setBar).not.toHaveBeenCalled();
            $httpBackend.flush();
            expect(foo.setBar).toHaveBeenCalled();

        });
    });

    describe('loadMore', function () {
        var feedService, $q;
        beforeEach(inject(function (_$httpBackend_, _feedService_, _$q_) {
            feedService = _feedService_;
            $q = _$q_;
            $httpBackend = _$httpBackend_;
            $httpBackend.expectJSONP(url).
            respond({
                items: feedsAsync
            });
        }));

        it('should return the new array whith the new items', function () {
            feedService.getFeeds('potato');
            var my = {
                spy: function () {}
            };
            spyOn(my, 'spy');

            $httpBackend.flush();
            var newFeeds = [].concat(feedsAsync, [{
                    title: 'new1',
                    link: 'link3'
                }, {
                    title: '',
                    link: 'link4'
                }]);
            $httpBackend.expectJSONP(url).
            respond({
                items: newFeeds
            });

            feedService.loadMore().then(function (res) {
                my.spy();
                expect(res.length).toBe(4);
            });

            $httpBackend.flush();
            expect(my.spy).toHaveBeenCalled();
        });

        it('it should not append feeds already fetched', function () {
            feedService.getFeeds('potato');
            var my = {
                spy: function () {}
            };
            spyOn(my, 'spy');
            $httpBackend.flush();

            var newFeeds = [].concat(feedsAsync, [{
                    title: 'new1',
                    link: 'link1'
                }, {
                    title: '',
                    link: 'link2'
                }]);

            $httpBackend.expectJSONP(url).
            respond({
                items: newFeeds
            });

            feedService.loadMore().then(function (res) {
                my.spy();
                expect(res.length).toBe(2);
            });
            $httpBackend.flush();
            expect(my.spy).toHaveBeenCalled();

        });

    });

    describe('getFeed', function () {
        var feedService, $q, $rootScope;
        beforeEach(inject(function (_$httpBackend_, _feedService_, _$q_, _$rootScope_) {
            feedService = _feedService_;
            $q = _$q_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $httpBackend.expectJSONP(url).
            respond({
                items: feedsAsync
            });
        }));

        it('should return the right feed given the index', function () {
            feedService.getFeeds('potato');
            $httpBackend.flush();
            feedService.getFeed(1).then(function (res) {
                expect(res).toBe(feedsAsync[1]);
            });
            $rootScope.$apply();
        });

        it('should return the right feed also after loadMore', function () {
            var newFeeds = feedsAsync.concat([{
                    title: 'new1',
                    link: 'link3'
                }, {
                    title: '',
                    link: 'link4'
                }]);
            feedService.getFeeds('potato');
            $httpBackend.flush();

            $httpBackend.expectJSONP(url).respond({
                items: newFeeds
            });

            feedService.loadMore();
            $httpBackend.flush();
            feedService.getFeed(2).then(function (res) {
                expect(res).toBe(newFeeds[2]);
            });
            $rootScope.$apply();
        });
    });


});