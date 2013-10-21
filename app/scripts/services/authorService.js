'use strict';

angular.module('potatoFlickrApp')
    .factory('authorService', ['$http', function ($http) {
        return {
            addAuthorDetail: function (feed) {
                $http.jsonp('http://api.flickr.com/services/rest/', {
                    params: {
                        method: 'flickr.people.getInfo',
                        api_key: '420cd85af2900ce8637ef0f5ff42496a',
                        format: 'json',
                        user_id: feed.author_id,
                        jsoncallback: 'JSON_CALLBACK'
                    }
                }).success(function (res) {
                    feed.authorName = (res.person.realname && res.person.realname._content) ||
                        (res.person.username && res.person.username._content) ||
                        'awesome name';
                    feed.profileLink = res.person.photosurl._content;
                });
            }
        };
    }]);