'use strict';
console.log('directive-audiobook/speed.js');

describe('Podcast Directive - ', function () {
    var test_podcast_page = 'mobile_podcasts.html#/new-releases-recent-arrivals/012';

    var speed_time_frame_10s = 10000;

    var test_helpers = require('../testHelpers.js');

    beforeEach(function () {
        browser.get(test_podcast_page);
        test_helpers.clear_local_storage(browser);
        browser.get(test_podcast_page);
        element(by.id('my_play_button')).click();
    });

    it("slow speed, in 10 seconds, 7 seconds is played", function () {
        element(by.id('slow_rate')).click();
        browser.wait(test_helpers.wait_milli_seconds(speed_time_frame_10s));
        expect(element(by.binding('my_currentTime')).getText()).toMatch('7s');
    });

    it("normal speed, in 10 seconds, 10 seconds is played", function () {
        element(by.id('normal_rate')).click();
        browser.wait(test_helpers.wait_milli_seconds(speed_time_frame_10s));
        expect(element(by.binding('my_currentTime')).getText()).toMatch('10s');
    });

    it("quick speed, in 10 seconds, 12 seconds is played", function () {
        element(by.id('quick_rate')).click();
        browser.wait(test_helpers.wait_milli_seconds(speed_time_frame_10s));
        expect(element(by.binding('my_currentTime')).getText()).toMatch('12s');
    });

    it("fast speed, in 10 seconds, 14 seconds is played", function () {
        element(by.id('fast_rate')).click();
        browser.wait(test_helpers.wait_milli_seconds(speed_time_frame_10s));
        expect(element(by.binding('my_currentTime')).getText()).toMatch('14s');
    });

});








