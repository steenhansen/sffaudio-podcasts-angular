describe('EpisodesCtrl', function () {
    var $httpBackend, $rootScope, createController;

    beforeEach(module('myApp'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        createController = function () {
            return $controller('EpisodesCtrl', {'$scope': $rootScope});
        };
        var controller = createController();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    function getRawPodcast(id) {
        if ('ignore_empty' === id) {
            var raw_as_array = [];
        } else {
            var the_raw_data = raw_podcast_data[id];
            var raw_as_array = [the_raw_data];
        }
        $httpBackend.when('GET', '/podcast_components/podcast/view_all.json').respond(raw_as_array);
        $httpBackend.expectGET('/podcast_components/podcast/view_all.json');
    };

    function getRawParticipants(raw_participants) {
        if ('ignore_empty' === raw_participants) {
            var raw_participants = [];
        }
        $httpBackend.when('GET', '/podcast_components/participants/view_participants.json').respond(raw_participants);
        $httpBackend.expectGET('/podcast_components/participants/view_participants.json');
    };

    function ignorePodcastsAndParticipants() {
        getRawPodcast('ignore_empty');
        getRawParticipants('ignore_empty');
        $httpBackend.flush();
    };

// 335 = audiobook
// 334 = audiobook-readalong
// 309 = new releases
// 333 = readalong
// 292 = talk to
// 273 = topic

    var raw_podcast_data = {
        "335": {
            "kind": "Audiobook",
            "participants": "",
            "author_sort": "Lindsay, David",
            "author_display": "by David Lindsay",
            "book_sort": "Voyage To Arcturus, A",
            "book_display": "A Voyage To Arcturus",
            "hh_mm_ss_length": "11:08:00",
            "narrator_sort": "Nelson, Mark",
            "narrator_display": ". Narrated by Mark Nelson",
            "padded_podcast_id": "335",
            "a_or_an_kind": "An",
            "about_display": ""
        },
        "309": {
            "kind": "New Releases\/recent Arrivals",
            "participants": "Jenny, Jesse, Tamahome",
            "author_sort": "",
            "author_display": "",
            "book_sort": "",
            "book_display": "",
            "hh_mm_ss_length": "01:45:00",
            "narrator_sort": "",
            "narrator_display": "",
            "padded_podcast_id": "309",
            "a_or_an_kind": "",
            "about_display": ""
        },
        "334": {
            "kind": "Audiobook\/readalong",
            "participants": "Fred, Jesse",
            "author_sort": "Hawthorne, Nathaniel",
            "author_display": "by Nathaniel Hawthorne",
            "book_sort": "BirthMark, The",
            "book_display": "The Birth-Mark",
            "hh_mm_ss_length": "02:41:00",
            "narrator_sort": "Himebaugh, Fred",
            "narrator_display": ". Narrated by Fred Himebaugh",
            "padded_podcast_id": "334",
            "a_or_an_kind": "An",
            "about_display": ""
        },
        "292": {
            "kind": "Talk To",
            "participants": "Jesse",
            "author_sort": "",
            "author_display": "",
            "book_sort": "",
            "book_display": "",
            "hh_mm_ss_length": "00:52:00",
            "narrator_sort": "",
            "narrator_display": "",
            "padded_podcast_id": "292",
            "a_or_an_kind": "A",
            "about_display": "John Betancourt, the publisher of Wildside Press"
        },
        "273": {
            "kind": "Topic",
            "participants": "Cory Olsen, Jesse, Mr Jim Moon, Seth",
            "author_sort": "",
            "author_display": "",
            "book_sort": "",
            "book_display": "",
            "hh_mm_ss_length": "01:20:00",
            "narrator_sort": "",
            "narrator_display": "",
            "padded_podcast_id": "273",
            "a_or_an_kind": "A",
            "about_display": "J.R.R. Tolkien\u2019s Tom Bombadil"
        }
    };

    var expected_podcast_data = {
        "335": {
            kind: 'Audiobook',
            participants: '',
            author_sort: 'Lindsay, David',
            author_display: 'by David Lindsay',
            book_sort: 'Voyage To Arcturus, A',
            book_display: 'A Voyage To Arcturus',
            hh_mm_ss_length: '11:08:00',
            narrator_sort: 'Nelson, Mark',
            narrator_display: '. Narrated by Mark Nelson',
            padded_podcast_id: '335',
            a_or_an_kind: 'An',
            about_display: '',
            the_padded_podcast_id: '#335',
            local_play_state: '',
            local_play_state_sort: ';;;Not Started;;;',
            display_kind: 'Audiobook',
            filter_kind: ':::Audiobook:::',
            kind_fragment: 'audiobook',
            with_participants: '',
            delimited_participants: ')))))))))'
        },
        "334": {
            kind: 'Audiobook/readalong',
            participants: 'Fred, Jesse',
            author_sort: 'Hawthorne, Nathaniel',
            author_display: 'by Nathaniel Hawthorne',
            book_sort: 'BirthMark, The',
            book_display: 'The Birth-Mark',
            hh_mm_ss_length: '02:41:00',
            narrator_sort: 'Himebaugh, Fred',
            narrator_display: '. Narrated by Fred Himebaugh',
            padded_podcast_id: '334',
            a_or_an_kind: 'An',
            about_display: '',
            the_padded_podcast_id: '#334',
            local_play_state: '',
            local_play_state_sort: ';;;Not Started;;;',
            display_kind: 'Audiobook/readalong',
            filter_kind: ':::Audiobook/readalong:::',
            kind_fragment: 'audiobook-readalong',
            with_participants: 'with Fred, Jesse',
            delimited_participants: ')))Fred)))Jesse))))))'
        },
        "309": {
            kind: 'New Releases/recent Arrivals',
            participants: 'Jenny, Jesse, Tamahome',
            author_sort: '',
            author_display: '',
            book_sort: '',
            book_display: '',
            hh_mm_ss_length: '01:45:00',
            narrator_sort: '',
            narrator_display: '',
            padded_podcast_id: '309',
            a_or_an_kind: '',
            about_display: '',
            the_padded_podcast_id: '#309',
            local_play_state: '',
            local_play_state_sort: ';;;Not Started;;;',
            display_kind: 'New Releases/recent Arrivals',
            filter_kind: ':::New Releases/recent Arrivals:::',
            kind_fragment: 'new-releases-recent-arrivals',
            with_participants: 'with Jenny, Jesse, Tamahome',
            delimited_participants: ')))Jenny)))Jesse)))Tamahome))))))'
        },
        "292": {
            kind: 'Talk To',
            participants: 'Jesse',
            author_sort: '',
            author_display: '',
            book_sort: '',
            book_display: '',
            hh_mm_ss_length: '00:52:00',
            narrator_sort: '',
            narrator_display: '',
            padded_podcast_id: '292',
            a_or_an_kind: 'A',
            about_display: 'John Betancourt, the publisher of Wildside Press',
            the_padded_podcast_id: '#292',
            local_play_state: '',
            local_play_state_sort: ';;;Not Started;;;',
            display_kind: 'Talk To',
            filter_kind: ':::Talk To:::',
            kind_fragment: 'talk-to',
            with_participants: 'with Jesse',
            delimited_participants: ')))Jesse))))))'
        },
        "273": {
            kind: 'Topic',
            participants: 'Cory Olsen, Jesse, Mr Jim Moon, Seth',
            author_sort: '',
            author_display: '',
            book_sort: '',
            book_display: '',
            hh_mm_ss_length: '01:20:00',
            narrator_sort: '',
            narrator_display: '',
            padded_podcast_id: '273',
            a_or_an_kind: 'A',
            about_display: 'J.R.R. Tolkien\u2019s Tom Bombadil',
            the_padded_podcast_id: '#273',
            local_play_state: '',
            local_play_state_sort: ';;;Not Started;;;',
            display_kind: 'Topic',
            filter_kind: ':::Topic:::',
            kind_fragment: 'topic',
            with_participants: 'with Cory Olsen, Jesse, Mr Jim Moon, Seth',
            delimited_participants: ')))Cory Olsen)))Jesse)))Mr Jim Moon)))Seth))))))'
        }
    };


    var raw_and_expected_participants = [{"name": "Allan Kaster"}, {"name": "Anne Frid De Vries"}, {"name": "Ben Aaronovitch"}];


    it('should fetch stuff 335', function () {
        getRawPodcast(335);
        getRawParticipants('ignore_empty');
        $httpBackend.flush();
        expect($rootScope.the_podcasts).toEqualData([expected_podcast_data[335]]);
    });

    it('should fetch 334', function () {
        getRawPodcast(334);
        getRawParticipants('ignore_empty');
        $httpBackend.flush();
        expect($rootScope.the_podcasts).toEqualData([expected_podcast_data[334]]);
    });

    it('should fetch 309', function () {
        getRawPodcast(309);
        getRawParticipants('ignore_empty');
        $httpBackend.flush();
        expect($rootScope.the_podcasts).toEqualData([expected_podcast_data[309]]);
    });

    it('should fetch 292', function () {
        getRawPodcast(292);
        getRawParticipants('ignore_empty');
        $httpBackend.flush();
        expect($rootScope.the_podcasts).toEqualData([expected_podcast_data[292]]);
    });

    it('should fetch 273', function () {
        getRawPodcast(273);
        getRawParticipants('ignore_empty');
        $httpBackend.flush();
        expect($rootScope.the_podcasts).toEqualData([expected_podcast_data[273]]);
    });

    it('should fetch participants', function () {
        getRawPodcast('ignore_empty');
        getRawParticipants(raw_and_expected_participants);
        $httpBackend.flush();
        expect($rootScope.the_participants).toEqualData(raw_and_expected_participants);
    });

    it('should set PARTICIPANT_DELIMITER', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.PARTICIPANT_DELIMITER).toBe(episodes_module.FILTER_DELIMITERS.PARTICIPANT_DELIMITER);
    });

    it('should set PARTICIPANT_DELIMITER', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.KIND_DELIMITER).toBe(episodes_module.FILTER_DELIMITERS.KIND_DELIMITER);
    });

    it('should set PARTICIPANT_DELIMITER', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.PLAY_STATE_DELIMITER).toBe(episodes_module.FILTER_DELIMITERS.PLAY_STATE_DELIMITER);
    });

    it('should not be in error', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.have_episode_error).toBe(false);
    });

    it('should set limit_book to empty', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.is_mobile_show_header).toBe(false);
    });

    it('should set limit_book to empty', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.limit_book).toBe('');
    });

    it('should set highlight_kind_filter to empty', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.highlight_kind_filter).toBe(false);
    });

    it('should set limit_kind to empty', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.limit_kind).toBe('');
    });

    it('should set highlight_participant_filter to empty', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.highlight_participant_filter).toBe(false);
    });

    it('should set limit_participant to empty', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.limit_participant).toBe('');
    });

    it('should set highlight_played_filter to empty', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.highlight_played_filter).toBe(false);
    });

    it('should set limit_played to empty', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.limit_played).toBe('');
    });

    it('should set limit_played to empty', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.the_kinds).toBe(episodes_module.PODCAST_KINDS);
    });

    it('should set limit_played to empty', function () {
        ignorePodcastsAndParticipants();
        expect($rootScope.played_states).toBe(episodes_module.PLAYED_STATES);
    });

});


