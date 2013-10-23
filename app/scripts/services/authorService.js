'use strict';

angular.module('potatoFlickrApp')
    .factory('authorService', ['$http', function ($http) {
        return {
            addAuthorDetail: function (feed) {
                $http.jsonp('http://api.flickr.com/services/rest/', {
                    params: {
                        method: 'flickr.people.getInfo',
                        api_key: 'dd7d2fcd63a0e3c724d3c76622a1a547',
                        format: 'json',
                        user_id: feed.author_id,
                        jsoncallback: 'JSON_CALLBACK'
                    }
                }).success(function (res) {

                    if (res.person) {
                        feed.authorName = (res.person.realname && res.person.realname._content) ||
                            (res.person.username && res.person.username._content) ||
                            'awesome name';
                        feed.profileLink = res.person.photosurl._content;
                    } else{
                        feed.authorName = 'awesome name';
                        feed.profileLink = '#';
                    }

                });
            }
        };
    }]);