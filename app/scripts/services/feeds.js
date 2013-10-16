'use strict';
var services = angular.module('potato.Services', []);

services.factory('feeds', ['$http', '$q', function ($http, $q) {
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
                        tag: tag,
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
                if (feeds.length > 0) {
                    return feeds[index];
                } else {
                    return {
                        error: 'notFound'
                    };
                }

            },
            loadMore: function () {
                var defer = $q.defer();
                $http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', {
                    params: {
                        tagsMode: 'all',
                        format: 'json',
                        tag: currentTag,
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
                        feeds.concat(newFeeds);
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