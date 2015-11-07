'use strict';

console.log('directive-audiobook/back-forward.js');

describe("The forward/backward buttons -", function () {
    var test_podcast_page = 'mobile_podcasts.html#/new-releases-recent-arrivals/012';

    var pre_load_back_forth_10s = 10000;

    var load_back_forth_start_1_dot_5s = 1500;

    var load_back_forth_1s = 1000;

    var test_helpers = require('../testHelpers.js');

    describe("forward 2min button should work", function () {
        it(', load forward 2min', function () {
            browser.get(test_podcast_page);
             test_helpers.clear_local_storage(browser);
            browser.get(test_podcast_page);
            browser.wait(test_helpers.wait_milli_seconds(pre_load_back_forth_10s));
            element(by.id('my_play_button')).click();
        });

        it(", should be at 0s", function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('0s');
            browser.wait(test_helpers.wait_milli_seconds(load_back_forth_start_1_dot_5s));
            element(by.id('my_forward_120')).click();
        });

        it(', should be at 02:01', function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('02:01');
            browser.wait(test_helpers.wait_milli_seconds(load_back_forth_1s));
            element(by.id('my_forward_120')).click();
        });

        it(", should be at 04:02", function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('04:02');
        });

    });

    describe("forward 30s button should work", function () {

        it(', load forward 30s', function () {
            browser.get(test_podcast_page);
             test_helpers.clear_local_storage(browser);
            browser.get(test_podcast_page);
            browser.wait(test_helpers.wait_milli_seconds(pre_load_back_forth_10s));
            element(by.id('my_play_button')).click();
        });

        it(", should be at 0s", function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('0s');
            browser.wait(test_helpers.wait_milli_seconds(load_back_forth_start_1_dot_5s));
            element(by.id('my_forward_30')).click();
        });

        it(', should be at 31s', function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('31s');
            browser.wait(test_helpers.wait_milli_seconds(load_back_forth_1s));
            element(by.id('my_forward_30')).click();
        });

        it(", should be at 01:02", function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('01:02');
            browser.wait(test_helpers.wait_milli_seconds(load_back_forth_1s));
        });

    });

    describe("back 15sec button should work", function () {

        it(',load back 15sec', function () {
            browser.get(test_podcast_page);
             test_helpers.clear_local_storage(browser);
            browser.get(test_podcast_page);
            browser.wait(test_helpers.wait_milli_seconds(pre_load_back_forth_10s));
            element(by.id('my_play_button')).click();
        });

        it(", should be at 0s", function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('0s');
            browser.wait(test_helpers.wait_milli_seconds(load_back_forth_start_1_dot_5s));
            element(by.id('my_forward_30')).click();
        });

        it(", should be at 31s", function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('31s');
            browser.wait(test_helpers.wait_milli_seconds(load_back_forth_1s));
            element(by.id('my_backward_15')).click();
        });

        it(', should be at 17s', function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('17s');
            browser.wait(test_helpers.wait_milli_seconds(load_back_forth_1s));
            element(by.id('my_backward_15')).click();
        });

        it(", should be at 3s", function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('3s');
        });

    });

    describe("back 30s button should work", function () {

        it(',load back 30sec', function () {
            browser.get(test_podcast_page);
             test_helpers.clear_local_storage(browser);
            browser.get(test_podcast_page);
            browser.wait(test_helpers.wait_milli_seconds(pre_load_back_forth_10s));
            element(by.id('my_play_button')).click();
        });

        it(", should be at 0s", function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('0s');
            browser.wait(test_helpers.wait_milli_seconds(load_back_forth_start_1_dot_5s));
            element(by.id('my_forward_120')).click();
        });

        it(', should be at 01:01', function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('02:01');
            browser.wait(test_helpers.wait_milli_seconds(load_back_forth_1s));
            element(by.id('my_backward_30')).click();
        });


        it(', should be at 01:32', function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('01:32');
            browser.wait(test_helpers.wait_milli_seconds(load_back_forth_1s));
            element(by.id('my_backward_30')).click();
        });

        it(', should be at 01:03', function () {
            expect(element(by.binding('my_currentTime')).getText()).toMatch('01:03');
        });

     });

});










