'use strict';


describe('local-storage-value', function() {

    var local_storage_value = new LocalStorageValue();

    it('should be able to set a value', function () {
        var has_local_storage = local_storage_value.hasLocalStorage();
        expect(has_local_storage).toBe(true);
    });

    it('should be able to remove a value', function () {
        local_storage_value.storeLocalValue('my_test', 19);
        local_storage_value.removeLocalValue('my_test');
        var q = local_storage_value.getLocalValue('my_test');
        expect(q).toBe(null);
    });

    it('should be able to set a value', function () {
        local_storage_value.removeLocalValue('my_test');
        local_storage_value.storeLocalValue('my_test', 19);
        var q = local_storage_value.getLocalValue('my_test');
        expect(q).toBe('19');
    });

});