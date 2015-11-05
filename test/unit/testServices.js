'use strict';

describe('podcast--service', function() {

    beforeEach(module('podcast-service'));

    it('check the existence of podcast-service factory', inject(function(podcastService) {
        expect(podcastService).toBeDefined();
    }));
});


describe('participants--service', function() {

    beforeEach(module('participants-service'));

    it('check the existence of participants-service factory', inject(function(participantsService) {
        expect(participantsService).toBeDefined();
    }));
});