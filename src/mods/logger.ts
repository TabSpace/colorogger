import cloneDeep from 'lodash/cloneDeep';
import isPlainObject from 'lodash/isPlainObject';
import { formatTime } from './time';
import { LoggerOptions, ThemeOptions } from '../lib.d';

const defaultLevels = {
  debug: 0,
  log: 1,
  info: 2,
  warn: 3,
  error: 4,
};

const defaultColors = {
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

const defaultIcons = {
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

export default class Logger {
  public conf: any;
  public meta: Object;
  public levels: Object;
  public colors: Object;
  public icons: Object;
  public transport: Function;

  public constructor(options?: LoggerOptions) {
    this.conf = {};
    this.meta = {};
    this.levels = {
      ...defaultLevels,
    };
    this.colors = {
      ...defaultColors,
    };
    this.icons = {
      ...defaultIcons,
    };
    this.config(options);
    Object.keys(this.levels).forEach((level) => {
      this.method(level, {
        level,
      });
    });
    ['success', 'fail', 'tip', 'stress'].forEach((prop) => {
      this.method(prop, {
        level: 'log',
        flag: prop,
      });
    });
  }

  public log(...args: any) {}
  public info(...args: any) {}
  public debug(...args: any) {}
  public warn(...args: any) {}
  public error(...args: any) {}
  public success(...args: any) {}
  public fail(...args: any) {}
  public tip(...args: any) {}
  public stress(...args: any) {}

  // set theme
  public theme(spec: ThemeOptions) {
    ['colors', 'icons'].forEach((prop) => {
      if (typeof spec[prop] === 'object') {
        Object.assign(this[prop], {
          ...spec[prop],
        });
      }
    });
  }

  // set config
  public config(options?: LoggerOptions) {
    const conf = {
      color: true,
      timeStamp: true,
      print: true,
      metaColor: false,
      meta: {},
      timeTemplate: '{{YYYY}}/{{MM}}/{{DD}} {{hh}}:{{mm}}:{{ss}}.{{mss}}',
      wrapIcon: (icon) => `[${icon}]`,
      wrapTag: (tag, key) => `[${tag}]`,
      transport: null,
      ...options,
    };
    this.conf = conf;
    Object.assign(this.meta, {
      ...conf.meta,
    });
    if (typeof conf.transport === 'function') {
      this.transport = conf.transport;
    }
  }

  // clone logger
  public fork(options?) {
    const clone = Object.create(this);
    Object.keys(this).forEach((key) => {
      if (isPlainObject(this[key])) {
        clone[key] = cloneDeep(this[key]);
      } else {
        clone[key] = this[key];
      }
    });
    clone.config(options);
    return clone;
  }

  // add custom method
  public method(name: string, options?) {
    this[name] = function (...para) {
      const opts = { ...options };
      this.output(opts, para);
    };
  }

  public destroy() {
    this.conf.transport = null;
    Object.keys(this).forEach((prop) => {
      this[prop] = null;
    });
  }

  public output(options: any, para: Array<any>) {
    const spec: any = {
      level: 'log',
      flag: '',
      color: '',
      ...options,
    };
    const { conf, meta, levels, colors, icons } = this;

    const msg: any = {};
    Object.assign(msg, meta);

    msg.content = para;
    msg.level = spec.level;
    msg.flag = spec.flag;
    msg.grade = levels[msg.level] || 0;
    msg.time = Date.now();

    let level = spec.level || 'log';
    const icon = icons[spec.flag] || icons[level];
    const color = spec.color || colors[spec.flag] || colors[level];

    let method = level;
    if (typeof console[method] !== 'function') {
      method = 'log';
    }

    let args: Array<any> = [];
    args = para.slice(0);
    args = args.map((item) => {
      let itemColor = '';
      if (conf.color && color) {
        itemColor = color;
      }
      return {
        color: itemColor,
        content: item,
      };
    });

    Object.keys(meta)
      .reverse()
      .forEach((key) => {
        const tag = meta[key] || '';
        if (tag) {
          const strTag = conf.wrapTag(tag, key);
          const itemTag = {
            color: 'gray',
            content: strTag,
          };
          if (conf.metaColor) {
            itemTag.color = conf.color ? color : 'gray';
            if (isPlainObject(conf.metaColor)) {
              itemTag.color = conf.metaColor[key] || 'gray';
            }
          }
          if (strTag) {
            args.unshift(itemTag);
          }
        }
      });

    let tagLevel = conf.wrapIcon(level);
    if (icon) {
      let iconTag = icon.icon;
      if (iconTag) {
        tagLevel = conf.wrapIcon(iconTag);
      }
      const iconColor = icon.color || '';
      const itemIcon = {
        color: conf.color ? iconColor : '',
        content: tagLevel,
      };
      args.unshift(itemIcon);
    }

    if (conf.timeStamp) {
      const time = formatTime(msg.time, {
        template: conf.timeTemplate,
      });
      args.unshift({
        color: 'gray',
        content: time,
      });
    }

    msg.__content = this.parseArgs(args);

    if (typeof this.transport === 'function') {
      this.transport(msg);
    }
    if (conf.print) {
      if (method === 'debug') {
        method = 'log';
      }
      console[method].apply(console, msg.__content);
    }
  }

  public parseArgs(args: Array<any>) {
    let arr = [];
    args.forEach((item) => {
      arr.push(item.content);
    });
    return arr;
  }
}
