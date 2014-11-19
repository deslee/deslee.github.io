/**
* Created by desmond on 11/19/2014.
*/
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/* inject:ts */ /// <reference path="references.ts" />
/* endinject */
var angular = window['angular'];

var GSC;
(function (GSC) {
    console.log('running gsc module');

    angular.module('gsc', [
        'gsc.services.survey',
        'gsc.surveyActions',
        'gsc.userActions',
        'gsc.services.user',
        'gsc.eventDispatcher',
        'gsc.tabs',
        'gsc.survey',
        'gsc.user'
    ]);
})(GSC || (GSC = {}));
var GSC;
(function (GSC) {
    var ModelController = (function () {
        function ModelController(service) {
            var _this = this;
            this.service = service;
            service.addChangeListener(function () {
                return _this.update();
            });
        }
        ModelController.prototype.update = function () {
        };
        return ModelController;
    })();
    GSC.ModelController = ModelController;
})(GSC || (GSC = {}));
/* inject:ts */ /// <reference path="../references.ts" />
/* endinject */
var GSC;
(function (GSC) {
    (function (FluxDirective) {
        function createFluxDirective(params, name) {
            var directive = {
                controller: params.controller,
                scope: params.scope ? angular.extend({}, params.scope) : {},
                controllerAs: name ? name : 'view'
            };

            if (params.templateUrl) {
                directive.templateUrl = params.templateUrl;
            }
            if (params.template) {
                directive.template = params.template;
            }
            return function () {
                return directive;
            };
        }
        FluxDirective.createFluxDirective = createFluxDirective;
    })(GSC.FluxDirective || (GSC.FluxDirective = {}));
    var FluxDirective = GSC.FluxDirective;
})(GSC || (GSC = {}));
/* inject:ts */ /// <reference path="../references.ts" />
/* endinject */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GSC;
(function (GSC) {
    (function (Survey) {
        var SurveyController = (function (_super) {
            __extends(SurveyController, _super);
            function SurveyController(surveyService, userService, userActions) {
                var _this = this;
                _super.call(this, surveyService);
                this.surveyService = surveyService;
                this.userService = userService;
                this.userActions = userActions;
                userService.register(function () {
                    return _this.usersUpdated();
                });
                this.usersUpdated();
                this.update();
            }
            SurveyController.prototype.update = function () {
                this.survey = this.surveyService.getCurrentUserSurvey();
            };

            SurveyController.prototype.logout = function () {
                this.userActions.logoutUser();
            };

            SurveyController.prototype.usersUpdated = function () {
                this.currentUser = this.userService.getCurrentUser();
                this.outerTab = this.currentUser ? 'survey' : 'login';
            };
            return SurveyController;
        })(GSC.ModelController);

        var SurveyLocationController = (function (_super) {
            __extends(SurveyLocationController, _super);
            function SurveyLocationController(surveyService, surveyActions) {
                _super.call(this, surveyService);
                this.surveyService = surveyService;
                this.surveyActions = surveyActions;
                this.importanceTab = undefined;
            }
            SurveyLocationController.prototype.setLocationImportance = function (importance) {
                this.surveyActions.location.importance(importance);
            };

            SurveyLocationController.prototype.update = function () {
                var survey = this.surveyService.getCurrentUserSurvey();
                console.log(survey);
                if (survey) {
                    this.importanceTab = survey.location.importance ? survey.location.importance : 'choose';
                }
            };
            return SurveyLocationController;
        })(GSC.ModelController);

        angular.module('gsc.survey', []).directive('gscSurvey', GSC.FluxDirective.createFluxDirective({
            templateUrl: 'gscflux/survey/survey.html',
            controller: SurveyController
        })).directive('gscSurveyLocation', GSC.FluxDirective.createFluxDirective({
            templateUrl: 'gscflux/survey/location.html',
            controller: SurveyLocationController
        })).directive('gscSurveySubjects', GSC.FluxDirective.createFluxDirective({
            templateUrl: 'gscflux/survey/subjects.html',
            controller: function (surveyActions, surveyService) {
                var i = 0;

                var shuffle = function (o) {
                    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
                        ;
                    return o;
                };

                var updateSubjects = function () {
                    var survey = surveyService.getCurrentUserSurvey();
                    if (survey) {
                        this.subjects = shuffle(survey.subjects);
                    }
                };
                surveyService.addChangeListener(angular.bind(this, updateSubjects));
                updateSubjects();

                this.addSubject = function () {
                    surveyActions.subjects.add({ 'text': 'subject ' + (++i) });
                };
            }
        }));
    })(GSC.Survey || (GSC.Survey = {}));
    var Survey = GSC.Survey;
})(GSC || (GSC = {}));
/* inject:ts */ /// <reference path="../references.ts" />
/* endinject */
var GSC;
(function (GSC) {
    (function (Services) {
        var EntityService = (function () {
            function EntityService(dispatcher) {
                var _this = this;
                this.dispatcher = dispatcher;
                this.CHANGE_EVENT = 'change';
                var EventEmitter = require('events').EventEmitter;
                this.emitter = new EventEmitter();

                this.register(function (payload) {
                    return _this.update(payload);
                });
            }
            EntityService.prototype.register = function (callback) {
                this.dispatchToken = this.dispatcher.register(callback);
            };

            EntityService.prototype.addChangeListener = function (callback) {
                this.emitter.on(this.CHANGE_EVENT, callback);
            };
            EntityService.prototype.removeChangeListener = function (callback) {
                this.emitter.removeListener(this.CHANGE_EVENT, callback);
            };
            EntityService.prototype.emitChange = function () {
                this.emitter.emit(this.CHANGE_EVENT);
            };
            EntityService.prototype.getDispatchToken = function () {
                return this.dispatchToken;
            };

            EntityService.prototype.update = function (payload) {
            };
            return EntityService;
        })();
        Services.EntityService = EntityService;
    })(GSC.Services || (GSC.Services = {}));
    var Services = GSC.Services;
})(GSC || (GSC = {}));
var GSC;
(function (GSC) {
    (function (User) {
        var UsersListController = (function (_super) {
            __extends(UsersListController, _super);
            function UsersListController(userService, userActions) {
                _super.call(this, userService);
                this.userService = userService;
                this.userActions = userActions;
                this.users = [];
            }
            UsersListController.prototype.update = function () {
                this.users = this.userService.getUsers();
            };

            UsersListController.prototype.login = function (user) {
                this.userActions.loginUser(user);
            };
            return UsersListController;
        })(GSC.ModelController);

        angular.module('gsc.user.login', []).directive('gscLogin', GSC.FluxDirective.createFluxDirective({
            templateUrl: 'gscflux/user/login.html',
            controller: UsersListController
        }));
    })(GSC.User || (GSC.User = {}));
    var User = GSC.User;
})(GSC || (GSC = {}));
/* inject:ts */ /// <reference path="../references.ts" />
/* endinject */
var GSC;
(function (GSC) {
    (function (User) {
        var UserRegistrationController = (function (_super) {
            __extends(UserRegistrationController, _super);
            function UserRegistrationController(userService, userActions) {
                _super.call(this, userService);
                this.userService = userService;
                this.userActions = userActions;
                this.form = {};
                this.users = [];
            }
            UserRegistrationController.prototype.submit = function () {
                var _this = this;
                if (this.users.filter(function (user) {
                    return user.name == _this.form.name;
                }).length > 0) {
                    this.errors = "User already exists";
                    return;
                }
                this.userActions.registerUser(this.form);
            };

            UserRegistrationController.prototype.update = function () {
                this.users = this.userService.getUsers();
            };
            return UserRegistrationController;
        })(GSC.ModelController);

        angular.module('gsc.user.register', ['gsc.user.login']).directive('gscRegister', GSC.FluxDirective.createFluxDirective({
            templateUrl: 'gscflux/user/register.html',
            controller: UserRegistrationController
        }));
    })(GSC.User || (GSC.User = {}));
    var User = GSC.User;
})(GSC || (GSC = {}));
/**
* Created by desmond on 11/19/2014.
*/
angular.module('gsc.user', ['gsc.user.login', 'gsc.user.register']);
/* inject:ts */ /// <reference path="../../references.ts" />
/* endinject */
var GSC;
(function (GSC) {
    (function (Services) {
        (function (EventDispatcher) {
            angular.module('gsc.eventDispatcher', []).service('dispatcher', require('flux').Dispatcher);
        })(Services.EventDispatcher || (Services.EventDispatcher = {}));
        var EventDispatcher = Services.EventDispatcher;
    })(GSC.Services || (GSC.Services = {}));
    var Services = GSC.Services;
})(GSC || (GSC = {}));
var GSC;
(function (GSC) {
    (function (Services) {
        /* inject:ts */ /// <reference path="../../references.ts" />
        /* endinject */
        (function (EventDispatcher) {
            (function (PayloadType) {
                PayloadType[PayloadType["UPDATE_SURVEY"] = 0] = "UPDATE_SURVEY";
                PayloadType[PayloadType["INITIALIZE_MOCK_SURVEY"] = 1] = "INITIALIZE_MOCK_SURVEY";
                PayloadType[PayloadType["REGISTER_USER"] = 2] = "REGISTER_USER";
                PayloadType[PayloadType["LOGIN_USER"] = 3] = "LOGIN_USER";
                PayloadType[PayloadType["LOGOUT_USER"] = 4] = "LOGOUT_USER";
            })(EventDispatcher.PayloadType || (EventDispatcher.PayloadType = {}));
            var PayloadType = EventDispatcher.PayloadType;
        })(Services.EventDispatcher || (Services.EventDispatcher = {}));
        var EventDispatcher = Services.EventDispatcher;
    })(GSC.Services || (GSC.Services = {}));
    var Services = GSC.Services;
})(GSC || (GSC = {}));
/* inject:ts */ /// <reference path="../../references.ts" />
/* endinject */
var GSC;
(function (GSC) {
    (function (Services) {
        (function (Survey) {
            var SurveyActions = (function () {
                function SurveyActions(dispatcher) {
                    var _this = this;
                    this.dispatcher = dispatcher;
                    this.location = {
                        importance: function (importance) {
                            return _this.dispatcher.dispatch({
                                type: 0 /* UPDATE_SURVEY */,
                                data: {
                                    property: "location.importance",
                                    value: function (survey) {
                                        survey.location.importance = importance;
                                    }
                                }
                            });
                        }
                    };
                    this.subjects = {
                        add: function (subject) {
                            return _this.dispatcher.dispatch({
                                type: 0 /* UPDATE_SURVEY */,
                                data: {
                                    property: "subjects",
                                    value: function (survey) {
                                        survey.subjects.push(subject);
                                    }
                                }
                            });
                        }
                    };
                }
                return SurveyActions;
            })();
            Survey.SurveyActions = SurveyActions;

            angular.module('gsc.surveyActions', []).service('surveyActions', SurveyActions);
        })(Services.Survey || (Services.Survey = {}));
        var Survey = Services.Survey;
    })(GSC.Services || (GSC.Services = {}));
    var Services = GSC.Services;
})(GSC || (GSC = {}));
/* inject:ts */ /// <reference path="../../references.ts" />
/* endinject */
var GSC;
(function (GSC) {
    (function (Services) {
        (function (Survey) {
            var SurveyService = (function (_super) {
                __extends(SurveyService, _super);
                function SurveyService(dispatcher, userService) {
                    _super.call(this, dispatcher);
                    this.dispatcher = dispatcher;
                    this.userService = userService;
                    this.surveys = [];
                }
                SurveyService.prototype.getAllSurveys = function () {
                    var surveyViewModel = angular.copy(this.surveys);
                    Object.freeze(surveyViewModel);
                    return surveyViewModel;
                };

                SurveyService.prototype.getCurrentUserSurvey = function () {
                    var survey = this._getCurrentUserSurvey();
                    if (survey) {
                        var surveyViewModel = angular.copy(survey);
                        Object.freeze(surveyViewModel);
                        return surveyViewModel;
                    }
                };

                SurveyService.prototype._getCurrentUserSurvey = function () {
                    var _this = this;
                    if (this.currentUser) {
                        var results = this.surveys.filter(function (survey) {
                            return survey.userName == _this.currentUser.name;
                        });
                        if (results.length > 0) {
                            return results[0];
                        }
                    }
                };

                SurveyService.prototype.updateSurveyAction = function (data) {
                    var currentUserSurvey = this._getCurrentUserSurvey();
                    if (currentUserSurvey) {
                        data.value(currentUserSurvey);
                    }
                };

                SurveyService.prototype.update = function (payload) {
                    var _this = this;
                    this.dispatcher.waitFor(this.userService.getDispatchToken);
                    switch (payload.type) {
                        case 0 /* UPDATE_SURVEY */:
                            this.updateSurveyAction(payload.data);
                            break;
                        case 3 /* LOGIN_USER */:
                            this.currentUser = payload.data;
                            var results = this.surveys.filter(function (survey) {
                                return survey.userName == _this.currentUser.name;
                            });
                            if (results.length == 0) {
                                this.surveys.push({
                                    subjects: [],
                                    userName: this.currentUser.name,
                                    location: {
                                        importance: undefined
                                    }
                                });
                            }
                            break;
                    }

                    this.emitChange();
                };
                return SurveyService;
            })(Services.EntityService);
            Survey.SurveyService = SurveyService;

            angular.module('gsc.services.survey', []).service('surveyService', SurveyService);
        })(Services.Survey || (Services.Survey = {}));
        var Survey = Services.Survey;
    })(GSC.Services || (GSC.Services = {}));
    var Services = GSC.Services;
})(GSC || (GSC = {}));
/* inject:ts */ /// <reference path="../../references.ts" />
/* endinject */
var GSC;
(function (GSC) {
    (function (Services) {
        (function (User) {
            var UserActions = (function () {
                function UserActions(dispatcher) {
                    this.dispatcher = dispatcher;
                }
                UserActions.prototype.registerUser = function (user) {
                    this.dispatcher.dispatch({
                        type: 2 /* REGISTER_USER */,
                        data: angular.copy(user)
                    });
                };

                UserActions.prototype.loginUser = function (user) {
                    this.dispatcher.dispatch({
                        type: 3 /* LOGIN_USER */,
                        data: angular.copy(user)
                    });
                };

                UserActions.prototype.logoutUser = function () {
                    this.dispatcher.dispatch({
                        type: 4 /* LOGOUT_USER */
                    });
                };
                return UserActions;
            })();
            User.UserActions = UserActions;

            angular.module('gsc.userActions', []).service('userActions', UserActions);
        })(Services.User || (Services.User = {}));
        var User = Services.User;
    })(GSC.Services || (GSC.Services = {}));
    var Services = GSC.Services;
})(GSC || (GSC = {}));
var GSC;
(function (GSC) {
    (function (Services) {
        /* inject:ts */ /// <reference path="../../references.ts" />
        /* endinject */
        (function (User) {
            var UserService = (function (_super) {
                __extends(UserService, _super);
                function UserService(dispatcher) {
                    _super.call(this, dispatcher);
                    this.dispatcher = dispatcher;
                    this.users = [];
                }
                UserService.prototype.getUsers = function () {
                    var userViewModel = angular.copy(this.users);
                    Object.freeze(userViewModel);
                    return userViewModel;
                };

                UserService.prototype.getCurrentUser = function () {
                    if (!this.currentUser) {
                        return undefined;
                    }

                    var currentUser = angular.copy(this.currentUser);
                    Object.freeze(currentUser);
                    return currentUser;
                };

                UserService.prototype.update = function (payload) {
                    switch (payload.type) {
                        case 2 /* REGISTER_USER */:
                            this.users.push(payload.data);
                            break;
                        case 3 /* LOGIN_USER */:
                            this.currentUser = payload.data;
                            break;
                        case 4 /* LOGOUT_USER */:
                            this.currentUser = null;
                            break;
                    }
                    this.emitChange();
                };
                return UserService;
            })(Services.EntityService);
            User.UserService = UserService;

            angular.module('gsc.services.user', []).service('userService', UserService);
        })(Services.User || (Services.User = {}));
        var User = Services.User;
    })(GSC.Services || (GSC.Services = {}));
    var Services = GSC.Services;
})(GSC || (GSC = {}));
//# sourceMappingURL=app.js.map
