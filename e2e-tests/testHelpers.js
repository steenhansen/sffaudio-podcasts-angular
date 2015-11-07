
var wait_milli_seconds = function makeTimer(wait_milli_secs) {
    var date_start = new Date();
    var milli_secs_future = date_start.getTime() + wait_milli_secs;
    return function () {
        var date_now = new Date();
        var milli_secs_now = date_now.getTime();
        var am_done;
        if (milli_secs_future < milli_secs_now) {
            am_done = true;
        } else {
            am_done = false;
        }
        return am_done;
    };
};

var clear_local_storage = function(browser){
    browser.executeScript('window.localStorage.clear();');
}


module.exports.wait_milli_seconds = wait_milli_seconds;
module.exports.clear_local_storage = clear_local_storage;

