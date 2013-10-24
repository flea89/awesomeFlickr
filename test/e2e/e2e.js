describe('my app', function () {
    'use strict';
    beforeEach(function () {
        browser().navigateTo('/');
        input('search').enter('');
    });

    it('should display some feeds', function () {
        expect(repeater('#list').count()).toBeGreaterThan(0);
    });

    it('should display some feeds given a tag', function () {
        input('search').enter('potato');
        sleep(2);
        element('.navbar button[type="submit"]').click();
        expect(repeater('#list').count()).toBeGreaterThan(0);
    });

    it('should load more feeds', function () {
        var getCount = repeater('#list').count();
        var number;
        getCount.execute(function (value) {
            number = value;
        });
        sleep(1);
        element('.load-more').click();
        expect(repeater('#list').count()).toBeGreaterThan(number);
    });

    it('should display the alert if there are no new feeds', function () {
        input('search').enter('asdasdasdasas_');
        element('.navbar button[type="submit"]').click();
        element('.load-more').click();
        expect(element('.alert').count()).toBe(1);

    });

    it('should navigate to the detail page', function () {
        element('.post-preview:first .post-preview__info__title').click();
        expect(browser().location().path()).toBe('/feedDetail/0');
    });

    it('should navigate to the proper feed detail', function () {
        var link_list;
        element('.post-preview:first .post-preview__info__flickr a').query(function (value,done) {
            link_list = value.attr('href');
            element('.post-preview:first .post-preview__info__title').click();
            expect(element('.title a').attr('href')).toEqual(link_list);
            done();
        });

    });


});