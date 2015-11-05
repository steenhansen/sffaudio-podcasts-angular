
function EpisodesModule(){
    'use strict';

    this.PLAYED_STATES =  [{"state": "Started"},
        {"state": "Not Started"},
        {"state": "Finished"}];

    this.PODCAST_KINDS = [{"type": "Audiobook"},
        {"type": "Audiobook/Readalong"},
        {"type": "New Releases/Recent Arrivals"},
        {"type": "Readalong"},
        {"type": "Talk To"},
        {"type": "Topic"}];

    this.FILTER_DELIMITERS = {
        'KIND_DELIMITER': ':::',
        'PARTICIPANT_DELIMITER': ')))',
        'PLAY_STATE_DELIMITER': ';;;'
    };

    this.participantDelimitation = function (participant_str, participant_separator, encasing_delimiter) {
        var participants_set = participant_str.split(participant_separator);
        var participant_filter_str = encasing_delimiter;
        angular.forEach(participants_set, function participantPeople(participant_name) {
            var trimmed_name = participant_name.trim();
            participant_filter_str += trimmed_name + encasing_delimiter;
        });
        participant_filter_str += encasing_delimiter;
        return participant_filter_str;
    };

    this.slugifyString = function (my_str) {
        var trimmed_str = my_str.trim().toLowerCase();
        var dashed_str = trimmed_str.replace(/[^A-Za-z0-9]/g, '-');
        return dashed_str;
    };

}

var episodes_module = new EpisodesModule();



