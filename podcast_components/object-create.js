

if (typeof Object.create != 'function') {
    Object.create = (function () {
        'use strict';

        function Temp() {
        }

        var hasOwn = Object.prototype.hasOwnProperty;

        return function (O) {
            if (typeof O != 'object') {
                throw new TypeError('Object prototype may only be an Object or null, from developer.mozilla.org');
            }
            Temp.prototype = O;
            var obj = new Temp();
            Temp.prototype = null;
            if (arguments.length > 1) {
                var Properties = Object(arguments[1]);
                for (var prop in Properties) {
                    if (hasOwn.call(Properties, prop)) {
                        obj[prop] = Properties[prop];
                    }
                }
            }
            return obj;
        };
    })();
}
