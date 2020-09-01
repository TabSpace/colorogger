export default class Logger {
  private config = {};
  private meta = {};
  private levels = {
    debug: 0,
    log: 1,
    info: 2,
    warn: 3,
    error: 4,
  };
  private colors = {
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
  private icons = {
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

  public constructor(options?) {
    this.set(options);
    this.init();
  }

  public output(options: any, para: Array<any>) {}
  public log(...args: any) {}
  public info(...args: any) {}
  public debug(...args: any) {}
  public warn(...args: any) {}
  public error(...args: any) {}
  public success(...args: any) {}
  public fail(...args: any) {}
  public tip(...args: any) {}
  public stress(...args: any) {}

  // clone logger
  public fork(options?) {
    const clone = Object.create(this);
    clone.config(options);
    return clone;
  }

  // set theme
  public theme(spec: any) {
    if (spec) {
      ['colors', 'icons', 'levels'].forEach((prop) => {
        if (typeof spec[prop] === 'object') {
          Object.assign(this[prop], spec[prop]);
        }
      });
    }
  }

  // set config
  public set(options) {
    const conf = {
      timeStamp: true,
      timeTemplate: '{{YYYY}}/{{MM}}/{{DD}} {{hh}}:{{mm}}:{{ss}}.{{mss}}',
      print: true,
      ...options,
    };
    this.config = conf;
    this.meta = {
      ...conf.meta,
    };
  }

  // add custom method
  public method(name: string, options) {
    this[name] = (...para) => {
      this.output(options, para);
    };
  }

  private init() {
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
}
