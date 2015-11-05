var LocalStorageValue = function () {
    try {
        localStorage.setItem('_check_local_storage_', '_check_local_storage_');
        localStorage.removeItem('_check_local_storage_');
        this.has_local_storage = true;
    } catch (e) {
        this.has_local_storage = false;
    }
};

LocalStorageValue.prototype.hasLocalStorage = function () {
    return this.has_local_storage;
};

LocalStorageValue.prototype.removeLocalValue = function (the_name) {
    if (this.has_local_storage) {
        localStorage.removeItem(the_name);
    }
};

LocalStorageValue.prototype.storeLocalValue = function (the_name, the_value) {
    if (this.has_local_storage) {
        localStorage.setItem(the_name, the_value);
    }
};

LocalStorageValue.prototype.getLocalValue = function (the_name) {
    if (this.has_local_storage) {
        var the_value = localStorage.getItem(the_name);
        return the_value;
    }
    return '';
};

LocalStorageValue.prototype.consoleLog = function () {
    var output = "  \n------------------------------------\n";
    output += "  LOCALSTORAGE DATA:";
    output += "  \n------------------------------------\n";
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        output += "  " + key + ': ' + value + '\n';
    }
    output += "  \n------------------------------------\n";
    console.log(output);
};






