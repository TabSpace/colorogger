import chalk, { Chalk } from 'chalk';
import Logger from './mods/logger';
import { strTypes } from './mods/constants';

function setColor(msg: PlainType, color: string) {
  let str = msg;
  if (strTypes.indexOf(typeof str) >= 0) {
    str = String(str);
  }
  if (color && typeof str === 'string') {
    if (color.charAt(0) === '#') {
      str = chalk.hex(color)(str);
    } else {
      const chalkColor: keyof Chalk = color as keyof Chalk;
      const chalkMethod = chalk[chalkColor] as Chalk;
      if (typeof chalkMethod === 'function') {
        str = chalkMethod(str);
      }
    }
  }
  return str;
}

class ServerLogger extends Logger {
  public constructor(options?: LoggerOptions) {
    super(options);
  }

  public parseArgs(args: PlainType[]): PlainType[] {
    const arr: PlainType[] = [];
    args.forEach((item) => {
      const content = setColor(item.content, item.color);
      arr.push(content);
    });
    return arr;
  }
}

// run at server
export default ServerLogger;
