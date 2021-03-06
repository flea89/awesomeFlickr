'use strict';

describe('Service: authorService', function () {
    var url = 'http://api.flickr.com/services/rest/?api_key=dd7d2fcd63a0e3c724d3c76622a1a547&format=json&jsoncallback=JSON_CALLBACK&method=flickr.people.getInfo&user_id=9418798';
    // load the service's module
    beforeEach(module('potatoFlickrApp'));

    // instantiate service
    var authorService, $httpBackend;
    beforeEach(inject(function (_authorService_, _$httpBackend_) {
        authorService = _authorService_;
        $httpBackend = _$httpBackend_;
        $httpBackend.expectJSONP(url).
        respond({

            person: {
                realname: {
                    _content: 'name'
                },
                photosurl: {
                    _content: 'url'
                }
            }

        });
    }));

    it('should do something', function () {
        var feed = {
            author_id: '9418798'
        };
        authorService.addAuthorDetail(feed);
        $httpBackend.flush();
        expect(feed).toEqual({
            author_id: '9418798',
            authorName: 'name',
            profileLink: 'url'
        });
    });

});