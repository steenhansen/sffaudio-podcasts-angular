'use strict';

console.log('directive-audiobook/play-pause.js');

describe('Podcast Directive - ', function () {
    var test_podcast_page = 'mobile_podcasts.html#/new-releases-recent-arrivals/012';
    var test_error_page = 'mobile_podcasts.html#/audiobook-readalong/999';


    var start_1_dot_5_sec = 1500;       // give an extra 1/2 second for startup time
    var play_pause_2s = 2000;          // wait 2 seconds to ensure that all audiobook-directives are updated

    var test_helpers = require('../testHelpers.js');

    describe("play pause -", function () {
        it('load play-pause 0s, no error, nor busy', function () {
            browser.get(test_podcast_page);
            test_helpers.clear_local_storage(browser);
            browser.get(test_podcast_page);
        });

        it("should be no busy image before start", function () {
            expect(element(by.id('my_busy_img')).isDisplayed()).toBe(false);
        });
        it("should be no error image before start", function () {
            expect(element(by.id('my_error_img')).isDisplayed()).toBe(false);
        });
        it("should be at Play before start", function () {
            expect(element(by.binding('play_button_text')).getText()).toBe('Play');
        });
        it("should be at 0s before start", function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('0s');
            element(by.id('my_play_button')).click();        			 // PLAYING
            browser.wait(test_helpers.wait_milli_seconds(start_1_dot_5_sec));         // This will match 1s since no fractions
        });

        it("should be no busy image when playing 1", function () {
            expect(element(by.id('my_busy_img')).isDisplayed()).toBe(false);
        });
        it("should be no error image when playing 1", function () {
            expect(element(by.id('my_error_img')).isDisplayed()).toBe(false);
        });
        it("should show 'pause' when playing 1", function () {
            expect(element(by.binding('play_button_text')).getText()).toBe('Pause');
        });
        it("should show '1s' when playing 1", function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('1s');
            element(by.id('my_play_button')).click();        // pausing
            browser.wait(test_helpers.wait_milli_seconds(play_pause_2s));  //audiobook is NOT playing
        });

        it("should be busy image when pausing 1", function () {
            expect(element(by.id('my_busy_img')).isDisplayed()).toBe(true);
        });
        it("should be no error image when pausing 1", function () {
            expect(element(by.id('my_error_img')).isDisplayed()).toBe(false);
        });
        it("should show 'play' when pausing 1", function () {
            expect(element(by.binding('play_button_text')).getText()).toBe('Play');
        });
        it("should show '1s' when pausing 1", function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('1s');   // still paused
            element(by.id('my_play_button')).click();        // Playing
        });

        it("should show '3s' when playing 2", function () {
            browser.wait(test_helpers.wait_milli_seconds(play_pause_2s));
            expect(element(by.binding('my_currentTime')).getText()).toMatch('3s');
        });
        it("should be no busy image when playing 2", function () {
            expect(element(by.id('my_busy_img')).isDisplayed()).toBe(false);
        });
        it("should be no error image when playing 2", function () {
            expect(element(by.id('my_error_img')).isDisplayed()).toBe(false);
        });
        it("should be no error image when pausing 2", function () {
            expect(element(by.binding('play_button_text')).getText()).toBe('Pause');
        });

    });

    describe("should pause multiple times at 0s", function () {
        it('load multiple times at 0s', function () {
            browser.get(test_podcast_page);
            test_helpers.clear_local_storage(browser);
            browser.get(test_podcast_page);
        });

        it('multiple pause should be "play" at start', function () {
            expect(element(by.binding('play_button_text')).getText()).toBe('Play');
        });

        it('multiple pause should be "0s" at start', function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('0s');
        });


        it('multiple pause should be "Pause" after started', function () {
            element(by.id('my_play_button')).click();         // started
            expect(element(by.binding('play_button_text')).getText()).toBe('Pause');
        });

        it('multiple pause should be "Pause" after started', function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('0s');
            element(by.id('my_play_button')).click();   //stopped
        });

        it('multiple pause should be "Play" after paused', function () {
            expect(element(by.binding('play_button_text')).getText()).toBe('Play');
        });

        it(', should show busy image when paused', function () {
            expect(element(by.id('my_busy_img')).isDisplayed()).toBe(false);    // at 0s, no busy image shown
        });

        it(", should show '0s' still play when paused ", function () {
            expect(element(by.binding('my_currentTime')).getText()).toBe('0s');
            element(by.id('my_play_button')).click();   //start
            browser.wait(test_helpers.wait_milli_seconds(play_pause_2s));
        });

        it(", should not show busy image when paused", function () {
            expect(element(by.id('my_busy_img')).isDisplayed()).toBe(false);
        });
        it(", should not show error image when paused", function () {
            expect(element(by.id('my_error_img')).isDisplayed()).toBe(false);
        });

        it(", should show 'Play' at end paused", function () {
            expect(element(by.binding('play_button_text')).getText()).toBe('Pause');
        });
        it(", should still have '2s' at end paused", function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('2s');
        });


        it(", should show '0s' still play when paused", function () {
            element(by.id('my_play_button')).click();               //stop
            browser.wait(test_helpers.wait_milli_seconds(play_pause_2s));
            expect(element(by.id('my_busy_img')).isDisplayed()).toBe(true);      // not at 0s anymore
        });

    });

    describe("should show error for non-existant id", function () {
        it('load non-existant id', function () {
            browser.get(test_error_page);
            test_helpers.clear_local_storage(browser);
            browser.get(test_error_page);
            browser.wait(test_helpers.wait_milli_seconds(5000));
        });

        it("error image, but no busy image", function () {
            expect(element(by.id('my_busy_img')).isDisplayed()).toBe(false);
        });

        it("error image only", function () {
            expect(element(by.id('my_error_img')).isDisplayed()).toBe(true);
        });

    });


});






