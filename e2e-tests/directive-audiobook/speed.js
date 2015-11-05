'use strict';
console.log('directive-audiobook/speed.js');

describe('Podcast Directive - ', function () {
    var test_podcast_page = 'mobile_podcasts.html#/new-releases-recent-arrivals/012';
    var clear_local_storage = 'window.localStorage.clear();';
    var speed_time_frame_10s = 10000;

    var wait_milli_seconds = function makeTimer(wait_milli_secs) {
        var date_start = new Date();
        var milli_secs_future = date_start.getTime() + wait_milli_secs;
        return function () {
            var date_now = new Date();
            var milli_secs_now = date_now.getTime();
            if (milli_secs_future < milli_secs_now) {
                return true;
            } else {
                return false;
            }
        };
    };

    beforeEach(function () {
        browser.get(test_podcast_page);
        browser.executeScript(clear_local_storage);
        browser.get(test_podcast_page);
        element(by.id('my_play_button')).click();
    });

    it("slow speed, in 10 seconds, 7 seconds is played", function () {
        element(by.id('slow_rate')).click();
        browser.wait(wait_milli_seconds(speed_time_frame_10s));
        expect(element(by.binding('my_currentTime')).getText()).toMatch('7s');
    });

    it("normal speed, in 10 seconds, 10 seconds is played", function () {
        element(by.id('normal_rate')).click();
        browser.wait(wait_milli_seconds(speed_time_frame_10s));
        expect(element(by.binding('my_currentTime')).getText()).toMatch('10s');
    });

    it("quick speed, in 10 seconds, 12 seconds is played", function () {
        element(by.id('quick_rate')).click();
        browser.wait(wait_milli_seconds(speed_time_frame_10s));
        expect(element(by.binding('my_currentTime')).getText()).toMatch('12s');
    });

    it("fast speed, in 10 seconds, 14 seconds is played", function () {
        element(by.id('fast_rate')).click();
        browser.wait(wait_milli_seconds(speed_time_frame_10s));
        expect(element(by.binding('my_currentTime')).getText()).toMatch('14s');
    });

});








