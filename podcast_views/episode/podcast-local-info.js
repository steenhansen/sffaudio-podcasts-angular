function PodcastLocalInfo() {
    'use strict';

    LocalStorageValue.call(this);
}

var PODCAST_CONSTANTS = {
    PODCAST_URL_FOLDER: {value: window.location.host + '/podcasts/'},
    IS_MOBILE_PODCAST: {value: '/mobile_podcasts.html'},
    PREFIX_PODCAST_KEY: {value: 'audio_'},
    POSTFIX_DURATION_KEY: {value: '_duration'}
};

PodcastLocalInfo.prototype = Object.create(LocalStorageValue.prototype, PODCAST_CONSTANTS);
PodcastLocalInfo.prototype.constructor = PodcastLocalInfo;

PodcastLocalInfo.prototype.startWaitToScroll = function (anchor_name, $location, $anchorScroll, $interval) {
    'use strict';

    var wait_tenth_seconds_max = 50;         // will try for 50*100=5000 milliseconds
    var tenth_seconds = 100;
    this.removeLocalValue('last_podcast_name');

    function waitToReallyScroll() {
        wait_tenth_seconds_max--;
        if (1 > wait_tenth_seconds_max) {
            $interval.cancel(stop_wait_to_really_scroll);
            return;
        }

        var before_scroll_pos = window.scrollY || window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
        if (0!==before_scroll_pos){
                $interval.cancel(stop_wait_to_really_scroll);
        }

        var avoid_a_reload = $location.hash();
        $location.hash(anchor_name);
        $anchorScroll();
        $location.hash(avoid_a_reload);
    }

    var stop_wait_to_really_scroll = $interval(waitToReallyScroll, tenth_seconds);
};


PodcastLocalInfo.prototype.getLocalAudioData = function (local_audio_key) {
    'use strict';

    var local_storage_seconds = +this.getLocalValue(local_audio_key);
    if (!angular.isNumber(local_storage_seconds)) {
        return 0;
    }
    return local_storage_seconds;
};

PodcastLocalInfo.prototype.finishedNotStarted = function (padded_podcast_id) {
    'use strict';

    var audio_id = 'audio_' + padded_podcast_id;
    var sort_played_state;

    var local_value = +this.getLocalValue(audio_id);
    if (local_value) {
        if (-1 === local_value) {
            sort_played_state = 'Finished';
        } else if (0 === local_value) {
            sort_played_state = 'Not Started';
        } else {
            sort_played_state = 'Started';
        }
    } else {
        sort_played_state = 'Not Started';
    }
    return sort_played_state;
};

PodcastLocalInfo.prototype.localPodcastPlayState = function (padded_podcast_id) {
    'use strict';

    var display_played_state;

    if (this.hasLocalStorage()) {
        var sort_played_state = this.finishedNotStarted(padded_podcast_id);
        if ('Not Started' === sort_played_state) {
            display_played_state = '';
        } else {
            display_played_state = '(' + sort_played_state + ')';
        }
    } else {
        display_played_state = ' nothing - blank me';
    }
    return display_played_state;
};

PodcastLocalInfo.prototype.localPodcastPlayStatePadded = function (padded_podcast_id, play_state_delimiter) {
    'use strict';

    var filter_played_state;

    if (this.hasLocalStorage()) {
        var sort_played_state = this.finishedNotStarted(padded_podcast_id);
        filter_played_state = play_state_delimiter + sort_played_state + play_state_delimiter;
    } else {
        filter_played_state = play_state_delimiter + '(Not Started)' + play_state_delimiter;
    }
    return filter_played_state;
};

PodcastLocalInfo.prototype.servingMobilePodcasts = function () {
    'use strict';

    var serving_mobile_podcasts;
    if (this.IS_MOBILE_PODCAST === location.pathname) {
        serving_mobile_podcasts = true;
    } else {
        serving_mobile_podcasts = false;
    }
    return serving_mobile_podcasts;
};

PodcastLocalInfo.prototype.addWithToFront = function (my_participant_str) {
    'use strict';

    var trimmed_participants = my_participant_str.trim();
    if ('' !== trimmed_participants) {
        trimmed_participants = 'with ' + trimmed_participants;
    }
    return trimmed_participants;
};

PodcastLocalInfo.prototype.setLocalAudioData = function (local_audio_key, seconds_value) {
    'use strict';

    this.storeLocalValue(local_audio_key, seconds_value);
};

PodcastLocalInfo.prototype.getCurrentSeconds = function (podcast_id) {
    'use strict';

    var local_storage_key = this.PREFIX_PODCAST_KEY + podcast_id;
    var current_seconds = this.getLocalAudioData(local_storage_key);
    return current_seconds;
};

PodcastLocalInfo.prototype.setCurrentSeconds = function (podcast_id, seconds) {
    'use strict';

    var local_storage_key = this.PREFIX_PODCAST_KEY + podcast_id;
    this.setLocalAudioData(local_storage_key, seconds);
};

PodcastLocalInfo.prototype.setFinishedState = function (podcast_id) {
    'use strict';

    var local_storage_key = this.PREFIX_PODCAST_KEY + podcast_id;
    this.setLocalAudioData(local_storage_key, -1);
};

PodcastLocalInfo.prototype.setDurationLength = function (podcast_id, duration) {
    'use strict';

    var local_storage_key = this.PREFIX_PODCAST_KEY + podcast_id + this.POSTFIX_DURATION_KEY;
    this.setLocalAudioData(local_storage_key, duration);
};

PodcastLocalInfo.prototype.getDurationLength = function (podcast_id) {
    'use strict';

    var local_storage_key = this.PREFIX_PODCAST_KEY + podcast_id + this.POSTFIX_DURATION_KEY;
    var duration = this.getLocalAudioData(local_storage_key);
    return duration;
};

var podcast_module = new PodcastLocalInfo();


