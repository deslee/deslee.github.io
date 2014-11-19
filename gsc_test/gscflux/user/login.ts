module GSC.User {
  class UsersListController extends ModelController {
    constructor(private userService: Services.User.UserService, private userActions: Services.User.UserActions) {
      super(userService);
    }
    public users = [];
    public update() {
      this.users = this.userService.getUsers();
    }

    public login(user: any) {
      this.userActions.loginUser(user);
    }
  }

  angular.module('gsc.user.login', [])
    .directive('gscLogin', GSC.FluxDirective.createFluxDirective({
      templateUrl: 'gscflux/user/login.html',
      controller: UsersListController
    }))
}
