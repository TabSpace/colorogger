export default class Logger {
  private constructor(options) {
    this.config(options);
  }

  // clone logger
  public fork(options) {
    const clone = Object.create(this);
    clone.config(options);
    return clone;
  }

  // set colors
  public theme(spec) {}

  // set meta message
  public config(options) {}
}
