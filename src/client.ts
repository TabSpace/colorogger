import Logger from './mods/logger';
import { strTypes } from './mods/constants';

// run at browser
// @see http://voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/

class ClientLogger extends Logger {
  public constructor(options?) {
    super(options);
  }

  public parseArgs(args: Array<any>) {
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
          extras.push(item.content);
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
}

export default ClientLogger;
