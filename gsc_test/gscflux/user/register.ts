/* inject:ts */ /// <reference path="../references.ts" />
 /* endinject */

module GSC.User {
  class UserRegistrationController extends ModelController {
    constructor(private userService: GSC.Services.User.UserService, private userActions: Services.User.UserActions) {
      super(userService);
    }

    public form:any = {};
    public users = [];
    public errors;

    submit() {
      if (this.users.filter((user) => {
        return user.name == this.form.name;
      }).length > 0) {
        this.errors = "User already exists"
        return;
      }
      this.userActions.registerUser(this.form);
    }

    public update() {
      this.users = this.userService.getUsers()
    }
  }

  angular.module('gsc.user.register', ['gsc.user.login'])
    .directive('gscRegister', GSC.FluxDirective.createFluxDirective({
      templateUrl: 'gscflux/user/register.html',
      controller: UserRegistrationController
    }))
  ;
}
