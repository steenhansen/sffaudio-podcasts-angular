'use strict';

console.log('episodes/list-search.js');

describe('Episodes List Pieces -', function testPodcastTypes() {
    var test_home_page = 'mobile_podcasts.html#/';
    var clear_local_storage = 'window.localStorage.clear();';
    var search_box = '';

    beforeEach(function() {
        browser.get(test_home_page);
        browser.executeScript(clear_local_storage);
        browser.get(test_home_page);
        search_box = element(by.id('search_textbox'));
    });

     it('should have 337 podcasts in the table', function () {
        var podcast_table_rows = element.all(by.binding('a_podcast.a_or_an_kind'));
        expect(podcast_table_rows.count()).toEqual(337);
    });

    it('2222 should have 2 matches for "dorian" in #332 and #333 ', function () {
        search_box.sendKeys('dorian');
        var dorian_count = element.all(by.repeater('a_podcast in the_podcasts')).count();
        expect(dorian_count).toBe(2);
    });

    it('should have 13 matches for "h.p. lovecraft"  ', function () {
        search_box.sendKeys('h.p. lovecraft');
        var hp_lovecraft_count = element.all(by.repeater('a_podcast in the_podcasts')).count();
        expect(hp_lovecraft_count).toBe(13);
    });

    it('should have 1 match for "birth-mark"  ', function () {
        search_box.sendKeys('Birth-mark');
        var birth_mark_count = element.all(by.repeater('a_podcast in the_podcasts')).count();
        expect(birth_mark_count).toBe(1);
    });

    it('should have 1 match for "Zelazny,"  ', function () {
        search_box.sendKeys('Zelazny,');
        var zelazny_comma_count = element.all(by.repeater('a_podcast in the_podcasts')).count();
        expect(zelazny_comma_count).toBe(1);
    });

    it('should have 1 match for "Dr."  ', function () {
        search_box.sendKeys('Dr.');
        var doctor_count = element.all(by.repeater('a_podcast in the_podcasts')).count();
        expect(doctor_count).toBe(1);
    });

});
