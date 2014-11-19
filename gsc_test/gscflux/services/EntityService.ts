/* inject:ts */ /// <reference path="../references.ts" />
 /* endinject */

module GSC.Services {
  export class EntityService {
    private emitter: any;
    public dispatchToken: string;
    private CHANGE_EVENT = 'change';

    constructor(public dispatcher: EventDispatcher.Dispatcher) {
      var EventEmitter = require('events').EventEmitter;
      this.emitter = new EventEmitter();

      this.register((payload) => this.update(payload));
    }

    public register(callback: (payload: EventDispatcher.Payload) => void): void {
      this.dispatchToken = this.dispatcher.register(callback);
    }

    public addChangeListener(callback) {
      this.emitter.on(this.CHANGE_EVENT, callback);
    }
    public removeChangeListener(callback) {
      this.emitter.removeListener(this.CHANGE_EVENT, callback);
    }
    public emitChange() {
      this.emitter.emit(this.CHANGE_EVENT);
    }
    public getDispatchToken() {
      return this.dispatchToken;
    }

    public update(payload: EventDispatcher.Payload) {

    }
  }
}
