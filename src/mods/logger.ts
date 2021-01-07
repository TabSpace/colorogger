import cloneDeep from 'lodash/cloneDeep';
import isPlainObject from 'lodash/isPlainObject';
import { formatTime } from './time';

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

declare type ThemeProp = 'colors' | 'icons';

export interface OutputOptions {
  level?: string;
  flag?: string;
  color?: string;
}

export default class Logger {
  public conf: LoggerOptions;
  public meta: PlainObject;
  public levels: PlainObject;
  public colors: PlainObject;
  public icons: PlainObject;
  public transport: (...args: PlainType[]) => void;
  public log: (...args: PlainType[]) => void;
  public info: (...args: PlainType[]) => void;
  public debug: (...args: PlainType[]) => void;
  public warn: (...args: PlainType[]) => void;
  public error: (...args: PlainType[]) => void;
  public success: (...args: PlainType[]) => void;
  public fail: (...args: PlainType[]) => void;
  public tip: (...args: PlainType[]) => void;
  public stress: (...args: PlainType[]) => void;
  [key: string]: PlainType | ((...args: string[]) => void);

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
    this[name] = function (...para: PlainType[]) {
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

  public output(options: OutputOptions, para: PlainType[]): void {
    const spec: PlainObject = {
      level: 'log',
      flag: '',
      color: '',
      ...options,
    };
    const { conf, meta, levels, colors, icons } = this;

    const msg: PlainObject = {};
    Object.assign(msg, meta);

    msg.content = para;
    msg.level = spec.level;
    msg.flag = spec.flag;
    msg.grade = levels[msg.level] || 0;
    msg.time = Date.now();

    const level = spec.level || 'log';
    const icon = icons[spec.flag] || icons[level];
    const color = spec.color || colors[spec.flag] || colors[level];

    let method = String(level) as keyof Console;
    if (typeof console[method] !== 'function') {
      method = 'log';
    }

    let args: PlainType[] = [];
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
          const itemTag: PlainObject = {
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
      const iconTag = icon.icon;
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
      console[method](...msg.__content);
    }
  }

  public parseArgs(args: PlainType[]): PlainType[] {
    const arr: PlainType[] = [];
    args.forEach((item) => {
      arr.push(item.content);
    });
    return arr;
  }
}
