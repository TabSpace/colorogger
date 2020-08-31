'use strict';

var Logger = /** @class */ (function () {
    function Logger(options) {
    }
    // clone logger
    Logger.prototype.fork = function (options) {
        var clone = Object.create(this);
        clone.config(options);
        return clone;
    };
    // set meta message
    Logger.prototype.config = function (options) {
    };
    return Logger;
}());

module.exports = Logger;
