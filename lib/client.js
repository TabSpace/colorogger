(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.colorogger = factory());
}(this, (function () { 'use strict';

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

  return Logger;

})));
