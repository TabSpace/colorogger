import chalk from 'chalk';
import Logger from './mods/logger';
import { strTypes } from './mods/constants';

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

  public parseArgs(args: Array<any>) {
    let arr = [];
    args.forEach((item) => {
      const content = setColor(item.content, item.color);
      arr.push(content);
    });
    return arr;
  }
}

// run at server
export default ServerLogger;
