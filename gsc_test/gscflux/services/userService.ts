/* inject:ts */ /// <reference path="../references.ts" />
 /* endinject */
module GSC.Services.User {
  export class UserService extends EntityService {
    constructor(dispatcher: EventDispatcher.Dispatcher) {
      super(dispatcher);
    }

    public getUser() {
      return {

      }
    }

    public update(payload: EventDispatcher.Payload) {
      console.log(payload);
    }
  }

  angular.module('gsc.services.user', []).service('users', UserService);
}
