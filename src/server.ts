import chalk, { Chalk } from 'chalk';
import Logger from './mods/logger';
import { strTypes } from './mods/constants';
import { LoggerOptions, PlainObject } from './types';

function setColor(msg: unknown, color: string): string {
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
  const rs = String(str);
  return rs;
}

class ServerLogger extends Logger {
  public constructor(options?: LoggerOptions) {
    super(options);
  }

  public parseArgs(args: PlainObject[]): unknown[] {
    const arr: unknown[] = [];
    args.forEach((item) => {
      const content = setColor(item.content, String(item.color));
      arr.push(content);
    });
    return arr;
  }
}

// run at server
export default ServerLogger;
