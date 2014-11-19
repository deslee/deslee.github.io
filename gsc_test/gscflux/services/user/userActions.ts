/* inject:ts */ /// <reference path="../../references.ts" />
/* endinject */

module GSC.Services.User {
  export class UserActions {
    constructor(private dispatcher: EventDispatcher.Dispatcher) {
    }

    public registerUser(user: any) {
      this.dispatcher.dispatch({
        type: EventDispatcher.PayloadType.REGISTER_USER,
        data: angular.copy(user)
      });
    }

    public loginUser(user: any) {
      this.dispatcher.dispatch({
        type: EventDispatcher.PayloadType.LOGIN_USER,
        data: angular.copy(user)
      })
    }

    public logoutUser() {
      this.dispatcher.dispatch({
        type: EventDispatcher.PayloadType.LOGOUT_USER
      })
    }
  }

  angular.module('gsc.userActions', []).service('userActions', UserActions);
}
