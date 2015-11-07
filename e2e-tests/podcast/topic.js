'use strict';

console.log('podcast/topic.js');

describe('A Topic Podcast -', function () {
	var test_podcast_id = 273;
	var the_type = 'topic';
	var type_text = 'A TOPIC';
	var view_podcast = {
		"participants":"Cory Olsen, Jesse, Mr Jim Moon, Seth",
		"author_display":"",
		"book_display":"",
		"hh_mm_ss_length":"01:20:00",
		"narrator_display":"",
		"padded_podcast_id":"273",
		"download_name":"SFFaudioPodcast273.mp3",
		"word_press_post":"http:\/\/www.sffaudio.com\/?p=52829",
		"about_display":"J.R.R. Tolkien\u2019s Tom Bombadil",
		"twitter":"original_referer=http%3A%2F%2Fwww.sffaudio.com%2F&amp;text=SFFaudio%20Podcast%20J.R.R.%20Tolkien%E2%80%99s%20Tom%20Bombadil&amp;url=http%3A%2F%2Fwww.sffaudio.com%2F%3Fp%3D52829"
	};

	var test_podcast_page = 'mobile_podcasts.html#/' + the_type + '/' + test_podcast_id;

	var download_match = "^http:\/\/localhost:8000\/podcasts\/SFFaudioPodcast273\.mp3$";
	var wordpress_match = "^http:\/\/www\.sffaudio\.com\/.*$";
	var twitter_match = "^https:\/\/twitter\.com\/intent\/tweet.*$";

	var wait_for_digest = 1000;
	var zero_seconds = '0s';
	var test_helpers = require('../testHelpers.js');


	beforeEach(function () {
		browser.get(test_podcast_page);
		test_helpers.clear_local_storage(browser);
		browser.get(test_podcast_page);
	});

	it('TOPIC : should show the download link', function () {
		describe("follow the download link", function() {
			beforeEach(function() {
				browser.ignoreSynchronization=true;
				browser.get(test_podcast_page);							// firefox bug, has to be here
				test_helpers.clear_local_storage(browser);
				browser.get(test_podcast_page);
				browser.wait(test_helpers.wait_milli_seconds(wait_for_digest));
			});
			it("download should be there, TOPIC", function() {

				element(by.id('my_download_link')).click();
				expect(browser.driver.getCurrentUrl()).toMatch(download_match);
			});
			afterEach(function() {
				browser.ignoreSynchronization=false;
			});
		});
	});

	it('TOPIC : should show the wordpress post', function () {
		describe("follow the wordpress link", function() {
			beforeEach(function() {
				browser.ignoreSynchronization=true;
				browser.get(test_podcast_page);							// firefox bug, has to be here
				test_helpers.clear_local_storage(browser);
				browser.get(test_podcast_page);
				browser.wait(test_helpers.wait_milli_seconds(wait_for_digest));
			});
			it("wordpress post should be there, TOPIC", function() {
				element(by.id('my_wordpress_post')).click();
				expect(browser.driver.getCurrentUrl()).toMatch(wordpress_match);
			});
			afterEach(function() {
				browser.ignoreSynchronization=false;
			});
		});
	});

	it('TOPIC : should show the twitter link', function () {
		describe("follow the twitter link", function() {
			beforeEach(function() {
				browser.ignoreSynchronization=true;
				browser.get(test_podcast_page);                         // firefox bug, has to be here
				test_helpers.clear_local_storage(browser);
				browser.get(test_podcast_page);
				browser.wait(test_helpers.wait_milli_seconds(wait_for_digest));
			});
			it("twitter link should be there, TOPIC", function() {
				element(by.id('my_twitter_link')).click();
				expect(browser.driver.getCurrentUrl()).toMatch(twitter_match);
			});
			afterEach(function() {
				browser.ignoreSynchronization=false;
			});
		});
	});

	it('should show about_display field', function () {
		expect(element(by.binding('audio_player_1.the_about_display')).getText()).toBe(view_podcast.about_display);
	});

	it('should show the type', function () {
		expect(element(by.name('top_podcast_play')).getText()).toContain(type_text);
	});

	it('should show the podcast id', function () {
		expect(element(by.binding('audio_player_1.the_padded_podcast_id')).getText()).toBe(view_podcast.padded_podcast_id);
	});

	it('should not show the books name', function () {
		expect(element(by.binding('audio_player_1.the_book_display')).isPresent()).toBe(false);
	});

	it('should not show the books author', function () {
		expect(element(by.binding('audio_player_1.the_author_display')).isPresent()).toBe(false);
	});

	it('should not show the narrator', function () {
		expect(element(by.binding('audio_player_1.the_narrator_display')).isPresent()).toBe(false);
	});

	it('should show the participants', function () {
		expect(element(by.binding('audio_player_1.the_participants')).getText()).toBe(view_podcast.participants);
	});

	it('should show the length', function () {
		expect(element(by.binding('audio_player_1.the_hh_mm_ss_length')).getText()).toBe(view_podcast.hh_mm_ss_length);
	});

	it('directive : should show the podcast id', function () {
		expect(element(by.id('id_padded_podcast')).getText()).toBe(view_podcast.padded_podcast_id);
	});

	it('directive : should show the current time', function () {
		expect(element(by.binding('my_currentTime')).getText()).toBe(zero_seconds);
	});



});



