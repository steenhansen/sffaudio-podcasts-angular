'use strict';


describe('podcast-local-info', function() {

    var podcast_local_info = new PodcastLocalInfo();

    it('should be able to set a value', function () {
        var has_local_storage = podcast_local_info.hasLocalStorage();
        expect(has_local_storage).toBe(true);
    });

    it('should be able to remove a value', function () {
        podcast_local_info.storeLocalValue('my_test', 19);
        podcast_local_info.removeLocalValue('my_test');
        var q = podcast_local_info.getLocalValue('my_test');
        expect(q).toBe(null);
    });

    it('should be able to set a value', function () {
        podcast_local_info.removeLocalValue('my_test');
        podcast_local_info.storeLocalValue('my_test', 19);
        var q = podcast_local_info.getLocalValue('my_test');
        expect(q).toBe('19');
    });



    it('should be able to set/get null played state', function () {
        podcast_local_info.removeLocalValue('012');
        expect( podcast_local_info.finishedNotStarted('012')).toBe('Not Started');
    });
    it('should be able to set/get 0s played state', function () {
        podcast_local_info.setCurrentSeconds('012', 0);
        expect( podcast_local_info.finishedNotStarted('012')).toBe('Not Started');
    });
    it('should be able to set/get started state', function () {
        podcast_local_info.setCurrentSeconds('012', 1);
        expect( podcast_local_info.finishedNotStarted('012')).toBe('Started');
    });
    it('should be able to set/get finished state', function () {
        podcast_local_info.setFinishedState('012');
        expect( podcast_local_info.finishedNotStarted('012')).toBe('Finished');
    });


    it('should be able to set/get null () played state', function () {
        podcast_local_info.removeLocalValue('audio_012');
        expect( podcast_local_info.localPodcastPlayState('012')).toBe('');
    });
    it('should be able to set/get 0s () not played state', function () {
        podcast_local_info.setCurrentSeconds('012', 0);
        expect( podcast_local_info.localPodcastPlayState('012')).toBe('');
    });
    it('should be able to set/get (started) state', function () {
        podcast_local_info.setCurrentSeconds('012', 1);
        expect( podcast_local_info.localPodcastPlayState('012')).toBe('(Started)');
    });
    it('should be able to set/get (finished) state', function () {
        podcast_local_info.setFinishedState('012');
        expect( podcast_local_info.localPodcastPlayState('012')).toBe('(Finished)');
    });



    it('should be able to set/get 0s delimited played state', function () {
        podcast_local_info.setCurrentSeconds('012', 0);
        expect( podcast_local_info.localPodcastPlayStatePadded('012', ';;;')).toBe(';;;Not Started;;;');
    });
    it('should be able to set/get delimited started state', function () {
        podcast_local_info.setCurrentSeconds('012', 1);
        expect( podcast_local_info.localPodcastPlayStatePadded('012', ';;;')).toBe(';;;Started;;;');
    });
    it('should be able to set/get delimited started state', function () {
        podcast_local_info.setFinishedState('012');
        expect( podcast_local_info.localPodcastPlayStatePadded('012', ';;;')).toBe(';;;Finished;;;');
    });




    it('should be able to set/get localAudioData', function () {
        podcast_local_info.setLocalAudioData('012', 123);
        expect(podcast_local_info.getLocalAudioData('012')).toBe(123);
    });

    it('should be able to servingMobilePodcasts', function () {
          expect(podcast_local_info.servingMobilePodcasts()).toBe(false);
    });

    it('should be able to addWithToFront with non-empty participants', function () {
        expect(podcast_local_info.addWithToFront('name1, name2')).toBe('with name1, name2');
    });
    it('should be able to addWithToFront with empty participants', function () {
        expect(podcast_local_info.addWithToFront('')).toBe('');
    });

    it('should be able to set/get currentSeconds', function () {
        podcast_local_info.setCurrentSeconds('012', 123);
        expect(podcast_local_info.getCurrentSeconds('012')).toBe(123);
    });

    it('should be able to set/get duration', function () {
        podcast_local_info.setDurationLength('012', 123);
        expect(podcast_local_info.getDurationLength('012')).toBe(123);
    });


});