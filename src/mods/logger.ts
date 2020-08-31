export default class Logger {
  private config: Object;

  private levels: {
    debug: 0;
    log: 1;
    info: 2;
    warn: 3;
    error: 4;
  };

  private colors: {
    log: '';
    info: 'blue';
    debug: 'gray';
    error: 'red';
    warn: 'yellow';
    success: 'green';
    fail: 'red';
    tip: 'cyan';
    stress: 'magenta';
  };

  private icons: {
    log: {
      icon: '.';
      color: '';
    };
    info: {
      icon: '*';
      color: 'blue';
    };
    debug: {
      icon: '#';
      color: 'gray';
    };
    warn: {
      icon: '!';
      color: 'yellow';
    };
    error: {
      icon: 'x';
      color: 'red';
    };
    success: {
      icon: '✓';
      color: 'green';
    };
    fail: {
      icon: '☢';
      color: 'red';
    };
    tip: {
      icon: '✱';
      color: 'cyan';
    };
    stress: {
      icon: '⚑';
      color: 'magenta';
    };
  };

  private constructor(options) {
    this.set(options);
    this.init();
  }

  public output(options: any, para: Array<any>) {}

  // clone logger
  public fork(options) {
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
    this.config = {
      ...options,
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
      });
    });
  }
}
