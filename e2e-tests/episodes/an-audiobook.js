'use strict';

console.log('episodes/an-audiobook.js');

describe('Episodes List Pieces -', function testPodcastTypes() {
    var test_home_page = 'mobile_podcasts.html#/';
    var test_helpers = require('../testHelpers.js');

    it('load page', function () {
        browser.get(test_home_page);
        test_helpers.clear_local_storage(browser);
        browser.get(test_home_page);
    });

    it('should have 337 podcasts in the table', function () {
        var podcast_table_rows = element.all(by.binding('a_podcast.a_or_an_kind'));
        expect(podcast_table_rows.count()).toEqual(337);
    });


    describe('Audiobook should match -335-', function () {
            var view_podcast = {
                "kind":"Audiobook",
                "participants":"",
                "author_sort":"Lindsay, David",
                "author_display":"by David Lindsay",
                "book_sort":"Voyage To Arcturus, A",
                "book_display":"A Voyage To Arcturus",
                "hh_mm_ss_length":"11:08:00",
                "narrator_sort":"Nelson, Mark",
                "narrator_display":". Narrated by Mark Nelson",
                "padded_podcast_id":"335",
                "a_or_an_kind":"An",
                "about_display":""            };
        var the_podcast_url_match = "#\/audiobook\/" + view_podcast.padded_podcast_id;

       var search_box = element(by.id('search_textbox'));

        it('filter to podcast', function () {
            search_box.sendKeys(view_podcast.padded_podcast_id);
        });

        it('should be only one podcast visible', function () {
            var podcast_count = element.all(by.repeater('a_podcast in the_podcasts')).count();
            expect(podcast_count).toBe(1);
        });

        it('should have correct url', function () {
            var the_anchor_name = "podcast_name_" + view_podcast.padded_podcast_id;
            expect(element(by.name(the_anchor_name)).getAttribute('href')).toMatch(the_podcast_url_match);
        });

        it('should have correct padded_podcast_id', function () {
            expect(element(by.binding('a_podcast.the_padded_podcast_id')).getText()).toBe('#'+view_podcast.padded_podcast_id);
        });

        it('should have no about_display', function () {
            expect(element(by.binding('a_podcast.about_display'))).toBeDefined(false);
        });

        it('should have correct book_display', function () {
            expect(element(by.binding('a_podcast.book_display')).getText()).toBe(view_podcast.book_display);
        });
        it('should have correct author_display', function () {
            expect(element(by.binding('a_podcast.author_display')).getText()).toBe(view_podcast.author_display);
        });
        it('should have correct narrator display', function () {
            expect(element(by.binding('a_podcast.narrator_display')).getText()).toBe(view_podcast.narrator_display);
        });

        it('should have correct a or an prefix', function () {
            expect(element(by.binding('a_podcast.a_or_an_kind')).getText()).toBe('An');
        });

        it('should be correct type', function () {
            expect(element(by.binding('a_podcast.display_kind')).getText()).toBe(view_podcast.kind);
        });

        it('should have no participants', function () {
            expect(element(by.binding('a_podcast.with_participants'))).toBeDefined(false);
        });

        it('should have correct length', function () {
            expect(element(by.binding('a_podcast.hh_mm_ss_length')).getText()).toBe(view_podcast.hh_mm_ss_length);
        });

        it('should have correct length', function () {
            expect(element(by.binding('a_podcast.local_play_state')).getText()).toBeDefined(true);
        });


    });


});
