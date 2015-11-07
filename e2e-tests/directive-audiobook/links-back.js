'use strict';

console.log('directive-audiobook/links-back.js');

describe('Podcast', function testPodcastTypes() {

	var test_helpers = require('../testHelpers.js');

	describe('Podcast link backs ', function testTopic() {
		var home_page_match = "^.*mobile_podcasts.html#\/$";
		var test_podcast_page = 'mobile_podcasts.html#/new-releases-recent-arrivals/012';

		beforeEach(function () {
			browser.get(test_podcast_page);
			test_helpers.clear_local_storage(browser);
			browser.get(test_podcast_page);
		});

		it('should do back link in audiobook player directive', function () {
			element(by.id('my_back_link')).click();
			expect(browser.getCurrentUrl()).toMatch(home_page_match);
		});

		it('should do back arrow link in audiobook player directive', function () {
			element(by.id('my_back_arrow_link')).click();
			expect(browser.getCurrentUrl()).toMatch(home_page_match);
		});


	});





});
