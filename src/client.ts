import Logger from './mods/logger';
import { STRING_AS_TYPES } from './mods/constants';
import { LoggerOptions, PlainObject } from './types';

// run at browser
// @see http://voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/

class ClientLogger extends Logger {
  public constructor(options?: LoggerOptions) {
    super(options);
  }

  public parseArgs(args: PlainObject[]): unknown[] {
    let arr: unknown[] = [];
    const strings: unknown[] = [];
    const colors: unknown[] = [];
    const extras: unknown[] = [];
    let breaked = false;
    args.forEach((arg) => {
      const item = arg;
      if (!breaked) {
        if (STRING_AS_TYPES.indexOf(typeof item.content) >= 0) {
          item.content = String(item.content);
        }
        if (typeof item.content === 'string') {
          strings.push(item.content);
          colors.push(`color: ${item.color};`);
        } else {
          breaked = true;
          extras.push(item.content);
        }
      } else {
        extras.push(item.content);
      }
    });

    if (strings.length) {
      arr.push(strings.map((str) => `%c ${str}`).join(' '));
      arr = arr.concat(colors);
    }
    arr = arr.concat(extras);
    return arr;
  }
}

export default ClientLogger;
