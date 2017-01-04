export default class DataHandler {
  constructor(buffering) {
    this.buffering = !!buffering;
    this.handlers = [];
    if (this.buffering) {
      this.buffer = [];
    }
  }
  fire(...args) {
    if (this.buffering && !this.handlers.length) {
      this.buffer.push(arguments);
    } else {
      this._fire(...args);
    }
  }
  handle(handler) {
    const fireBuffer = !this.handlers.length;
    this.handlers.push(handler);
    if (fireBuffer) {
      this._fire.apply(this, this.buffer);
      this.buffer = [];
    }
  }
  _fire(...args) {
    this.handlers.forEach(h => h(...args));
  }
}
