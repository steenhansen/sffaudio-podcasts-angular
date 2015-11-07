'use strict';

console.log('directive-audiobook/slider.js');

describe("The forward/backward buttons should affect the slider position -", function () {


    //  35:41==35*60+41= 2141 seconds
    var test_podcast_page = 'mobile_podcasts.html#/new-releases-recent-arrivals/012';

    var pre_load_slider_10s = 10000;
    var audio_controls_redraw_wait = 3000;

    var test_helpers = require('../testHelpers.js');

    beforeEach(function () {
        browser.get(test_podcast_page);
        test_helpers.clear_local_storage(browser);
        browser.get(test_podcast_page);
        browser.wait(test_helpers.wait_milli_seconds(audio_controls_redraw_wait));
        element(by.id('my_play_button')).click();
    });

    it('pre load slider', function () {
        browser.wait(test_helpers.wait_milli_seconds(pre_load_slider_10s));
    });

    it(", should be at 0 slider position before start", function () {
        expect(element(by.id('my_progress_slider')).getAttribute('value')).toMatch(0);
    });

    it(", should be at 240/2141=0.1120971508640822 after 04:00=8*30sec minute clicks", function () {
        element(by.id('my_forward_30')).click();
        element(by.id('my_forward_30')).click();
        element(by.id('my_forward_30')).click();
        element(by.id('my_forward_30')).click();
        element(by.id('my_forward_30')).click();
        element(by.id('my_forward_30')).click();
        element(by.id('my_forward_30')).click();
        element(by.id('my_forward_30')).click();
        element(by.id('my_play_button')).click();
        browser.wait(test_helpers.wait_milli_seconds(audio_controls_redraw_wait));
        expect(element(by.id('my_progress_slider')).getAttribute('value')).toMatch(0.112);
    });

    it(", should be at 120/2141=0.0560485754320411 after 4:00-2:00(8*15sec)=2:00", function () {
        element(by.id('my_forward_120')).click();
        element(by.id('my_forward_120')).click();   // 4:00
        element(by.id('my_backward_15')).click();
        element(by.id('my_backward_15')).click();
        element(by.id('my_backward_15')).click();
        element(by.id('my_backward_15')).click();
        element(by.id('my_backward_15')).click();
        element(by.id('my_backward_15')).click();
        element(by.id('my_backward_15')).click();
        element(by.id('my_backward_15')).click();  // 4:00-2:00=2:00
        element(by.id('my_play_button')).click();
        browser.wait(test_helpers.wait_milli_seconds(audio_controls_redraw_wait));
        expect(element(by.id('my_progress_slider')).getAttribute('value')).toMatch(0.056);
    });

    it(", should be at 600/2140=0.2803738317757009", function () {
        element(by.id('my_forward_120')).click();
        element(by.id('my_forward_120')).click();
        element(by.id('my_forward_120')).click();
        element(by.id('my_forward_120')).click();
        element(by.id('my_forward_120')).click();
        element(by.id('my_play_button')).click();
        browser.wait(test_helpers.wait_milli_seconds(audio_controls_redraw_wait));
        expect(element(by.id('my_progress_slider')).getAttribute('value')).toMatch(0.280);
    });

    it(", should be at 480/2141=0.2241943017281644 after 10:00-2:00=8:00", function () {
        element(by.id('my_forward_120')).click();
        element(by.id('my_forward_120')).click();
        element(by.id('my_forward_120')).click();
        element(by.id('my_forward_120')).click();
        element(by.id('my_forward_120')).click();

        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_play_button')).click();
        browser.wait(test_helpers.wait_milli_seconds(audio_controls_redraw_wait));
        expect(element(by.id('my_progress_slider')).getAttribute('value')).toMatch(0.224);
    });

    it(", should be at 0/2141=0 after 8:00-16:00  = 0 as cannot go past 0", function () {
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_backward_30')).click();
        element(by.id('my_play_button')).click();
        browser.wait(test_helpers.wait_milli_seconds(audio_controls_redraw_wait));
        expect(element(by.id('my_progress_slider')).getAttribute('value')).toMatch(0);
    });

    it(", should be at 2141/2141=1 but cannot get past 1.000, so 0.953 is where we get stuck", function () {
        for (var i=1; i<18; i++) {
            element(by.id('my_forward_120')).click();   // 17*120 = 2040    2040/2141= 0.9528257823446987
        }
        element(by.id('my_play_button')).click();
        browser.wait(test_helpers.wait_milli_seconds(audio_controls_redraw_wait));
        expect(element(by.id('my_progress_slider')).getAttribute('value')).toMatch(0.953);
    });

});




