import cloneDeep from 'lodash/cloneDeep';
import isPlainObject from 'lodash/isPlainObject';
import { formatTime } from './time';
import {
  LoggerOptions,
  PlainObject,
  IconOptions,
  Message,
  ThemeOptions,
  ThemeProp,
  OutputOptions,
} from '../types';

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
  warn: '#ffd700',
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
    color: '#1e90ff',
  },
  debug: {
    icon: '#',
    color: 'magenta',
  },
  warn: {
    icon: '!',
    color: '#ffd700',
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

export declare type LogMethod = (...args: unknown[]) => void;

export default abstract class Logger {
  public conf: LoggerOptions;
  public meta: PlainObject;
  public levels: PlainObject;
  public colors: PlainObject;
  public icons: IconOptions;
  public transport: (msg: Message) => void;
  public log: LogMethod;
  public info: LogMethod;
  public debug: LogMethod;
  public warn: LogMethod;
  public error: LogMethod;
  public success: LogMethod;
  public fail: LogMethod;
  public tip: LogMethod;
  public stress: LogMethod;
  [key: string]: LogMethod | unknown;

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

  // set theme
  public theme(spec: ThemeOptions): void {
    ['colors', 'icons'].forEach((prop: ThemeProp) => {
      Object.assign(this[prop], {
        ...spec[prop],
      });
    });
  }

  // set config
  public config(options?: LoggerOptions): void {
    const conf: LoggerOptions = {
      color: true,
      timeStamp: true,
      print: true,
      metaColor: false,
      stringify: false,
      meta: {},
      timeTemplate: '{{YYYY}}/{{MM}}/{{DD}} {{hh}}:{{mm}}:{{ss}}.{{mss}}',
      wrapIcon: (icon: string) => `[${icon}]`,
      wrapTag: (tag: string) => `[${tag}]`,
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
  public fork(options?: LoggerOptions): Logger {
    const clone = Object.create(this);
    Object.keys(this).forEach((key: string) => {
      const prop = this[key];
      if (isPlainObject(prop)) {
        clone[key] = cloneDeep(prop);
      } else {
        clone[key] = prop;
      }
    });
    clone.config(options);
    return clone;
  }

  // add custom method
  public method(name: string, options?: OutputOptions): void {
    this[name] = function (...para: string[]) {
      const opts = { ...options };
      this.output(opts, para);
    };
  }

  public destroy(): void {
    this.conf.transport = null;
    Object.keys(this).forEach((prop) => {
      this[prop] = null;
    });
  }

  public output(options: OutputOptions, para: unknown[]): void {
    const spec = {
      level: 'log',
      flag: '',
      color: '',
      ...options,
    };
    const { conf, meta, levels, colors, icons } = this;

    const msg: Message = {};
    Object.assign(msg, meta);

    const level = String(spec.level) || 'log';
    const flag = String(spec.flag);

    msg.content = para;
    msg.level = level;
    msg.flag = flag;
    msg.grade = Number(levels[level]) || 0;
    msg.time = Date.now();

    const icon = icons[String(spec.flag)] || icons[level];
    const color = spec.color || colors[flag] || colors[level];

    let args = [];
    args = para.slice(0);
    args = args.map((item) => {
      let itemColor = '';
      if (color) {
        itemColor = String(color);
      }
      return {
        color: itemColor,
        content: item,
      };
    });

    Object.keys(meta)
      .reverse()
      .forEach((key) => {
        const tag = String(meta[key]) || '';
        if (tag) {
          const strTag = conf.wrapTag(tag, key);
          const itemTag: PlainObject = {
            color: 'gray',
            content: strTag,
          };
          if (conf.metaColor) {
            itemTag.color = color || 'gray';
            if (typeof conf.metaColor === 'object') {
              const strMetaColor = conf.metaColor[key];
              itemTag.color = strMetaColor || 'gray';
            }
          }
          if (strTag) {
            args.unshift(itemTag);
          }
        }
      });

    let tagLevel = conf.wrapIcon(level);
    if (icon) {
      const iconTag = icon.icon;
      if (iconTag) {
        tagLevel = conf.wrapIcon(iconTag);
      }
      const iconColor = icon.color || '';
      const itemIcon = {
        color: iconColor || '',
        content: tagLevel,
      };
      args.unshift(itemIcon);
    }

    if (conf.timeStamp) {
      const time = formatTime(Number(msg.time), {
        template: conf.timeTemplate,
      });
      args.unshift({
        color: 'gray',
        content: time,
      });
    }

    let contentArgs = [];

    if (conf.color) {
      contentArgs = this.parseArgs(args);
    } else {
      contentArgs = args.map(item => item.content);
    }

    if (conf.stringify) {
      contentArgs = contentArgs.map((item) => {
        const type = typeof item;
        let str = '';
        if (type === 'boolean' || type === 'number' || type === 'string') {
          str = String(item);
        } else {
          str = String(JSON.stringify(item));
        }
        str = str.replace(/[\r\n]/g, ' ');
        return str;
      });
    }

    msg.__content = contentArgs;

    if (typeof this.transport === 'function') {
      this.transport(msg);
    }
    if (conf.print) {
      const method = 'log';
      console[method](...contentArgs);
    }
  }

  public abstract parseArgs(args: PlainObject[]): unknown[];
}
