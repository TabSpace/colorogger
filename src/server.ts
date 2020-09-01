import chalk from 'chalk';
import cloneDeep from 'lodash/cloneDeep';
import Logger from './mods/logger';
import { formatTime } from './mods/time';

const strTypes = ['undefined', 'null', 'number', 'boolean'];

function setColor(msg: any, color: string) {
  let str = msg;
  if (strTypes.indexOf(typeof str) >= 0) {
    str = String(str);
  }
  if (color && typeof str === 'string') {
    if (typeof chalk[color] === 'function') {
      str = chalk[color](str);
    } else if (color.charAt(0) === '#') {
      str = chalk.hex(color)(str);
    }
  }
  return str;
}

class ServerLogger extends Logger {
  public constructor(options?) {
    super(options);
  }

  // clone logger
  public fork(options?) {
    const clone = new ServerLogger(options);
    Object.keys(this).forEach((key) => {
      if (typeof this[key] === 'object') {
        clone[key] = cloneDeep(this[key]);
      } else {
        clone[key] = this[key];
      }
    });
    clone.config(options);
    return clone;
  }

  public output(options: any, para: Array<any>) {
    const spec: any = {
      level: 'log',
      flag: '',
      color: '',
      ...options,
    };
    const { conf, meta, levels, colors, icons } = this;

    console.log('output this:', this);
    console.log('output this.meta:', this.meta);

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
    if (color) {
      args = args.map((item) => setColor(item, color));
    }

    Object.keys(meta).forEach((key) => {
      const tag = meta[key] || '';
      if (tag) {
        let strTag = `[${tag}]`;
        strTag = setColor(strTag, color);
        args.unshift(strTag);
      }
    });

    let tagLevel = `[${level}]`;
    if (icon) {
      let iconTag = icon.icon;
      if (iconTag) {
        tagLevel = `[${iconTag}]`;
      }
      let iconColor = icon.color || color;
      tagLevel = setColor(tagLevel, iconColor);
      args.unshift(tagLevel);
    }

    if (conf.timeStamp) {
      const time = formatTime(msg.time, {
        template: conf.timeTemplate,
      });
      args.unshift(chalk.gray(time));
    }

    msg.__content = args;

    console.log('msg:', msg);

    if (typeof conf.transport === 'function') {
      conf.transport(msg);
    }
    if (conf.print) {
      console[method].apply(console, args);
    }
  }
}

// run at server
export default ServerLogger;
