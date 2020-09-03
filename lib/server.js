'use strict';

var chalk = require('chalk');
var cloneDeep = require('lodash/cloneDeep');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var defaultLevels = {
    debug: 0,
    log: 1,
    info: 2,
    warn: 3,
    error: 4,
};
var defaultColors = {
    log: '',
    info: '',
    debug: '',
    error: 'red',
    warn: 'yellow',
    success: 'green',
    fail: 'red',
    tip: 'cyan',
    stress: 'magenta',
};
var defaultIcons = {
    log: {
        icon: '.',
        color: '',
    },
    info: {
        icon: '*',
        color: 'blue',
    },
    debug: {
        icon: '#',
        color: 'magenta',
    },
    warn: {
        icon: '!',
        color: 'yellow',
    },
    error: {
        icon: 'x',
        color: 'red',
    },
    success: {
        icon: '✓',
        color: 'green',
    },
    fail: {
        icon: '☢',
        color: 'red',
    },
    tip: {
        icon: '✱',
        color: 'cyan',
    },
    stress: {
        icon: '⚑',
        color: 'magenta',
    },
};
var Logger = /** @class */ (function () {
    function Logger(options) {
        var _this = this;
        this.conf = {};
        this.meta = {};
        this.levels = __assign({}, defaultLevels);
        this.colors = __assign({}, defaultColors);
        this.icons = __assign({}, defaultIcons);
        this.config(options);
        Object.keys(this.levels).forEach(function (level) {
            _this.method(level, {
                level: level,
            });
        });
        ['success', 'fail', 'tip', 'stress'].forEach(function (prop) {
            _this.method(prop, {
                level: 'log',
                flag: prop,
            });
        });
    }
    Logger.prototype.output = function (options, para) { };
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Logger.prototype.success = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Logger.prototype.fail = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Logger.prototype.tip = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Logger.prototype.stress = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    // set theme
    Logger.prototype.theme = function (spec) {
        var _this = this;
        if (spec) {
            ['colors', 'icons'].forEach(function (prop) {
                if (typeof spec[prop] === 'object') {
                    Object.assign(_this[prop], spec[prop]);
                }
            });
        }
    };
    // set config
    Logger.prototype.config = function (options) {
        var conf = __assign({ color: true, timeStamp: true, timeTemplate: '{{YYYY}}/{{MM}}/{{DD}} {{hh}}:{{mm}}:{{ss}}.{{mss}}', print: true }, options);
        this.conf = conf;
        Object.assign(this.meta, __assign({}, conf.meta));
        if (typeof conf.transport === 'function') {
            this.transport = conf.transport;
        }
    };
    // clone logger
    Logger.prototype.fork = function (options) {
        var _this = this;
        var clone = Object.create(this);
        Object.keys(this).forEach(function (key) {
            if (typeof _this[key] === 'object') {
                clone[key] = cloneDeep__default['default'](_this[key]);
            }
            else {
                clone[key] = _this[key];
            }
        });
        clone.config(options);
        return clone;
    };
    // add custom method
    Logger.prototype.method = function (name, options) {
        this[name] = function () {
            var para = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                para[_i] = arguments[_i];
            }
            var opts = __assign({}, options);
            this.output(opts, para);
        };
    };
    Logger.prototype.destroy = function () {
        var _this = this;
        this.conf.transport = null;
        Object.keys(this).forEach(function (prop) {
            _this[prop] = null;
        });
    };
    return Logger;
}());

/**
 * 修正补位
 * @method fixTo
 * @param {Number|String} num 要补位的数字
 * @param {Number} [w=2] w 补位数量
 * @return {String} 经过补位的字符串
 * @example
 * fixTo(0, 2);	//return '00'
 */
function fixTo(num, width) {
    var str = num.toString();
    var space = Math.max((width || 2) - str.length + 1, 0);
    return new Array(space).join('0') + str;
}

/**
 * 简单模板函数
 * @method substitute
 * @param {String} str 要替换模板的字符串
 * @param {Object} obj 模板对应的数据对象
 * @param {RegExp} [reg=/\\?\{\{([^{}]+)\}\}/g] 解析模板的正则表达式
 * @return {String} 替换了模板的字符串
 * @example
 * substitute('{{city}}欢迎您', {city:'北京'}); // '北京欢迎您'
 */
function substitute(str, obj, reg) {
    return str.replace(reg || /\\?\{\{([^{}]+)\}\}/g, function (match, name) {
        if (match.charAt(0) === '\\') {
            return match.slice(1);
        }
        return obj[name] !== null && obj[name] !== undefined ? obj[name] : '';
    });
}

/**
 * 日期对象格式化输出
 *
 * 格式化日期对象模板键值说明
 * - year 年份原始数值
 * - month 月份原始数值[1, 12]
 * - date 日期原始数值[1, 31]
 * - day 星期原始数值[0, 6]
 * - hours 小时原始数值[0, 23]
 * - miniutes 分钟原始数值[0, 59]
 * - seconds 秒原始数值[0, 59]
 * - milliSeconds 毫秒原始数值[0, 999]
 * - YYYY 年份数值，精确到4位(12 => '0012')
 * - YY 年份数值，精确到2位(2018 => '18')
 * - Y 年份原始数值
 * - MM 月份数值，精确到2位(9 => '09')
 * - M 月份原始数值
 * - DD 日期数值，精确到2位(3 => '03')
 * - D 日期原始数值
 * - d 星期数值，通过 weekday 参数映射取得(0 => '日')
 * - hh 小时数值，精确到2位(9 => '09')
 * - h 小时原始数值
 * - mm 分钟数值，精确到2位(9 => '09')
 * - m 分钟原始数值
 * - ss 秒数值，精确到2位(9 => '09')
 * - s 秒原始数值
 * - mss 毫秒数值，精确到3位(9 => '009')
 * - ms 毫秒原始数值
 * @method format
 * @param {Date} time 日期对象，或者可以被转换为日期对象的数据
 * @param {Object} [spec] 格式化选项
 * @param {Array} [spec.weekday='日一二三四五六'.split('')] 一周内各天对应名称，顺序从周日算起
 * @param {String} [spec.template='{{YYYY}}-{{MM}}-{{DD}} {{hh}}:{{mm}}'] 格式化模板
 * @return {String} 格式化完成的字符串
 * @example
 * 	console.info(
 * 		format(new Date(),{
 * 			template : '{{YYYY}}年{{MM}}月{{DD}}日 周{{d}} {{hh}}时{{mm}}分{{ss}}秒'
 * 		})
 * 	);
 * 	// 2015年09月09日 周三 14时19分42秒
 */
function rLimit(num, width) {
    var str = fixTo(num, width);
    var delta = str.length - width;
    return delta > 0 ? str.substr(delta) : str;
}
function formatTime(time, spec) {
    var output = '';
    var data = {};
    var conf = __assign({ weekday: '日一二三四五六'.split(''), template: '{{YYYY}}-{{MM}}-{{DD}} {{hh}}:{{mm}}' }, spec);
    var dobj = new Date(Number(time));
    data.year = dobj.getFullYear();
    data.month = dobj.getMonth() + 1;
    data.date = dobj.getDate();
    data.day = dobj.getDay();
    data.hours = dobj.getHours();
    data.miniutes = dobj.getMinutes();
    data.seconds = dobj.getSeconds();
    data.milliSeconds = dobj.getMilliseconds();
    data.YYYY = rLimit(data.year, 4);
    data.YY = rLimit(data.year, 2);
    data.Y = data.year;
    data.MM = fixTo(data.month, 2);
    data.M = data.month;
    data.DD = fixTo(data.date, 2);
    data.D = data.date;
    data.d = conf.weekday[data.day];
    data.hh = fixTo(data.hours, 2);
    data.h = data.hours;
    data.mm = fixTo(data.miniutes, 2);
    data.m = data.miniutes;
    data.ss = fixTo(data.seconds, 2);
    data.s = data.seconds;
    data.mss = fixTo(data.milliSeconds, 3);
    data.ms = data.milliSeconds;
    output = substitute(conf.template, data);
    return output;
}

var strTypes = ['undefined', 'null', 'number', 'boolean'];
function setColor(msg, color) {
    var str = msg;
    if (strTypes.indexOf(typeof str) >= 0) {
        str = String(str);
    }
    if (color && typeof str === 'string') {
        if (typeof chalk__default['default'][color] === 'function') {
            str = chalk__default['default'][color](str);
        }
        else if (color.charAt(0) === '#') {
            str = chalk__default['default'].hex(color)(str);
        }
    }
    return str;
}
var ServerLogger = /** @class */ (function (_super) {
    __extends(ServerLogger, _super);
    function ServerLogger(options) {
        return _super.call(this, options) || this;
    }
    ServerLogger.prototype.output = function (options, para) {
        var spec = __assign({ level: 'log', flag: '', color: '' }, options);
        var _a = this, conf = _a.conf, meta = _a.meta, levels = _a.levels, colors = _a.colors, icons = _a.icons;
        var msg = {};
        Object.assign(msg, meta);
        msg.content = para;
        msg.level = spec.level;
        msg.flag = spec.flag;
        msg.grade = levels[msg.level] || 0;
        msg.time = Date.now();
        var level = spec.level || 'log';
        var icon = icons[spec.flag] || icons[level];
        var color = spec.color || colors[spec.flag] || colors[level];
        var method = level;
        if (typeof console[method] !== 'function') {
            method = 'log';
        }
        var args = [];
        args = para.slice(0);
        if (color && conf.color) {
            args = args.map(function (item) { return setColor(item, color); });
        }
        Object.keys(meta).forEach(function (key) {
            var tag = meta[key] || '';
            if (tag) {
                var strTag = "[" + tag + "]";
                if (conf.color) {
                    strTag = setColor(strTag, color);
                }
                args.unshift(strTag);
            }
        });
        var tagLevel = "[" + level + "]";
        if (icon) {
            var iconTag = icon.icon;
            if (iconTag) {
                tagLevel = "[" + iconTag + "]";
            }
            var iconColor = icon.color || '';
            if (conf.color) {
                tagLevel = setColor(tagLevel, iconColor);
            }
            args.unshift(tagLevel);
        }
        if (conf.timeStamp) {
            var time = formatTime(msg.time, {
                template: conf.timeTemplate,
            });
            args.unshift(chalk__default['default'].gray(time));
        }
        msg.__content = args;
        if (typeof this.transport === 'function') {
            this.transport(msg);
        }
        if (conf.print) {
            console[method].apply(console, args);
        }
    };
    return ServerLogger;
}(Logger));

module.exports = ServerLogger;
