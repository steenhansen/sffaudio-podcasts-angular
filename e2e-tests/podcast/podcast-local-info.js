'use strict';

console.log('protractor-local-info.js');

describe('scroll -', function () {
    var home_page_match = "mobile_podcasts.html#";

    var test_helpers = require('../testHelpers.js');

    beforeEach(function () {
        browser.get(home_page_match);
    });


    it("to podcast_name_012", function() {
        browser.executeScript(" podcast_module.storeLocalValue('last_podcast_name', 'podcast_name_012');");
        browser.get(home_page_match);
        browser.wait(test_helpers.wait_milli_seconds(6000)); // 50*100=5000 max wait + 1000 = 6000
        var web_page_scroll_to_012 = browser.executeScript('return window.scrollY;');
        browser.executeScript(" document.getElementById('podcast_id_012').scrollIntoView(); ");
        browser.wait(test_helpers.wait_milli_seconds(1000));
        var test_scroll_to_012 = browser.executeScript('return window.scrollY;');
        expect(web_page_scroll_to_012).toEqual(test_scroll_to_012);
    });

    it("to nothing", function() {
        browser.executeScript(" podcast_module.removeLocalValue('last_podcast_name');");
        browser.get(home_page_match);
        browser.wait(test_helpers.wait_milli_seconds(6000)); // 50*100=5000 max wait + 1000 = 6000
        var web_page_no_scroll_0 = browser.executeScript('return window.scrollY;');
        expect(web_page_no_scroll_0).toEqual(0);
    });



});



