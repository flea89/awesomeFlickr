describe('Service: feeds', function () {
    'use strict';
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
    var url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK&tag=potato&tagsMode=all';
    // load the service's module
    beforeEach(module('potato.Services'));

    // instantiate service
    var feeds, $httpBackend;


    beforeEach(inject(function (_feeds_) {
        feeds = _feeds_;
    }));

    it('should return an object', function () {
        expect(typeof feeds).toBe('object');
    });

    it('should return an object with property getFeeds, getFeed, loadMore of type function', function () {
        expect(typeof feeds.getFeeds).toBe('function');
        expect(typeof feeds.getFeed).toBe('function');
        expect(typeof feeds.loadMore).toBe('function');
    });


    describe('getFeeds', function () {
        var feeds, $q;

        beforeEach(inject(function (_$httpBackend_, _feeds_, _$q_) {
            feeds = _feeds_;
            $q = _$q_;
            $httpBackend = _$httpBackend_;
            $httpBackend.expectJSONP(url).
            respond({
                items: feedsAsync
            });
        }));


        it('should return a promise and fullfill it whith an array of 2 elements', function () {
            var feedsPromise = feeds.getFeeds('potato');
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
        var feeds, $q;
        beforeEach(inject(function (_$httpBackend_, _feeds_, _$q_) {
            feeds = _feeds_;
            $q = _$q_;
            $httpBackend = _$httpBackend_;
            $httpBackend.expectJSONP(url).
            respond({
                items: feedsAsync
            });
        }));

        it('should return the two new items', function () {
            feeds.getFeeds('potato');
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

            feeds.loadMore().then(function (res) {
                my.spy();
                expect(res.length).toBe(2);
            });

            $httpBackend.flush();
            expect(my.spy).toHaveBeenCalled();

        });

        it('it should not return feeds already fetched', function () {
            feeds.getFeeds('potato');
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

            feeds.loadMore().then(function (res) {
                my.spy();
                expect(res.length).toBe(0);
            });
            $httpBackend.flush();
            expect(my.spy).toHaveBeenCalled();

        });

    });


});