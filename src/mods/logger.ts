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
  warn: 'yellow',
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

export default class Logger {
  public conf: any;
  public meta: Object;
  public levels: Object;
  public colors: Object;
  public icons: Object;

  public constructor(options?) {
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
  public config(options) {
    const conf = {
      timeStamp: true,
      timeTemplate: '{{YYYY}}/{{MM}}/{{DD}} {{hh}}:{{mm}}:{{ss}}.{{mss}}',
      print: true,
      ...options,
    };
    this.conf = conf;
    Object.assign(this.meta, {
      ...conf.meta,
    });
  }

  // add custom method
  public method(name: string, options) {
    this[name] = function (...para) {
      this.output(options, para);
    };
  }
}
