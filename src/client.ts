import Logger from './mods/logger';
import { formatTime } from './mods/time';
import { substitute } from './mods/str';

// run at browser
// @see http://voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/

const strTypes = ['undefined', 'null', 'number', 'boolean'];

function parseArgs(args: Array<any>) {
  let arr = [];
  const strings = [];
  const colors = [];
  const extras = [];
  let breaked = false;
  args.forEach((item) => {
    if (!breaked) {
      if (strTypes.indexOf(typeof item.content) >= 0) {
        item.content = String(item.content);
      }
      if (typeof item.content === 'string') {
        strings.push(item.content);
        colors.push(`color: ${item.color};`);
      } else {
        breaked = true;
      }
    } else {
      extras.push(item.content);
    }
  });

  if (strings.length) {
    arr.push(strings.map((str) => `%c${str}`).join(' '));
    arr = arr.concat(colors);
  }
  arr = arr.concat(extras);
  return arr;
}

class ClientLogger extends Logger {
  public constructor(options?) {
    super(options);
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

    Object.keys(meta).forEach((key) => {
      const tag = meta[key] || '';
      if (tag) {
        const strTag = conf.wrapTag(tag);
        const itemTag = {
          color: conf.color ? color : '',
          content: strTag,
        };
        args.unshift(itemTag);
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

    msg.__content = parseArgs(args);

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
}

export default ClientLogger;
