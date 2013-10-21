angular.module('potato.Services', [])
    .factory('feeds', ['$http', '$q', function ($http, $q) {
        'use strict';
        var feeds = [];
        var currentTag;
        return {
            getFeeds: function (tag) {
                var defer = $q.defer();
                feeds.tag = tag;
                currentTag = tag;
                $http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', {
                    params: {
                        tagsMode: 'all',
                        format: 'json',
                        tags: tag,
                        jsoncallback: 'JSON_CALLBACK'
                    }
                }).success(function (res) {
                    feeds = res.items;
                    defer.resolve(feeds);
                }).error(function () {
                    defer.reject('error');
                });
                return defer.promise;
            },
            getFeed: function (index) {
                //In this scenario this API could be sincronous, just a lookup in the feed array.
                //The actual API doesn't allow to fetch a single feed given an ID, so we can't provide linkable links
                //for every post detail.
                //However getFeed is already coded as an async call to allow a future development that fetches the
                //post from the Network
                
                var defer = $q.defer();
                if (feeds.length > 0) {
                    defer.resolve(feeds[index]);
                } else {
                    defer.reject();
                }
                return defer.promise;
            },
            loadMore: function () {
                var defer = $q.defer();
                $http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', {
                    params: {
                        tagsMode: 'all',
                        format: 'json',
                        tags: currentTag,
                        jsoncallback: 'JSON_CALLBACK'
                    }
                }).success(function (res) {
                    if (Array.isArray(res.items)) {
                        var newFeeds = res.items.filter(function (newFeed) {
                            var found = false;
                            for (var i = 0; i < feeds.length; i++) {
                                if (feeds[i].link === newFeed.link) {
                                    found = true;
                                    break;
                                }
                            }
                            return !found;
                        });
                        feeds.push.apply(feeds,newFeeds);
                        defer.resolve(newFeeds);
                    } else {
                        defer.reject();
                    }
                }).error(function () {
                    defer.reject();
                });
                return defer.promise;
            }
        };

    }]);