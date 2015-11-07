'use strict';

console.log('episodes/list-filters.js');

describe('Episodes List Pieces -', function testPodcastTypes() {
	var test_home_page = 'mobile_podcasts.html#/';
	var test_helpers = require('../testHelpers.js');

		it('should have a clear all button', function () {
			browser.get(test_home_page);
			test_helpers.clear_local_storage(browser);
			browser.get(test_home_page);
			expect(element(by.id('audio-clear-all'))).toBeDefined(true);
		});

	it('should have a search box', function () {
		expect(element(by.id('search_textbox'))).toBeDefined(true);
	});

	it('should have 7 types to select from', function () {
		var select_filter_kinds = element.all(by.css('select[id="audio-limit-type"] option'));
		expect(select_filter_kinds.count()).toEqual(7);
	});

	it('should have 93 participants', function () {
		var select_filter_participants = element.all(by.css('select[id="audio-limit-participant"] option'));
		expect(select_filter_participants.count()).toEqual(93);
	});

	it('should have 7 types', function () {
		var select_filter_played = element.all(by.css('select[id="audio-limit-played"] option'));
		expect(select_filter_played.count()).toEqual(4);
	});

	it('should have id sort', function () {
		expect(element(by.id('audio-sort-podcast-id'))).toBeDefined(true);
	});
	it('should have length sort', function () {
		expect(element(by.id('audio-sort-length'))).toBeDefined(true);
	});
	it('should have kind sort', function () {
		expect(element(by.id('audio-sort-kind'))).toBeDefined(true);
	});
	it('should have narrator sort', function () {
		expect(element(by.id('audio-sort-narrator'))).toBeDefined(true);
	});

	it('should have book sort', function () {
		expect(element(by.id('audio-sort-book'))).toBeDefined(true);
	});
	it('should have author sort', function () {
		expect(element(by.id('audio-sort-author'))).toBeDefined(true);
	});
	it('should have played-state sort', function () {
		expect(element(by.id('audio-played-state'))).toBeDefined(true);
	});

});
