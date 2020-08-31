(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.colorogger = factory());
}(this, (function () { 'use strict';

  // run at browser

  class Logger {
    log() {
      console.log('client logger');
    }
  }

  return Logger;

})));
