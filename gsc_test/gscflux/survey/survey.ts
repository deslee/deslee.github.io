/* inject:ts */ /// <reference path="../references.ts" />
 /* endinject */

module GSC.Survey {
  class SurveyController extends ModelController {
    constructor(private surveyService: GSC.Services.Survey.SurveyService, private userService: GSC.Services.User.UserService, private userActions: Services.User.UserActions) {
      super(surveyService);
      userService.register(() => this.usersUpdated());
      this.usersUpdated();
      this.update();
    }

    public survey: any;
    public currentUser: any;
    public outerTab: string;
    public innerTab: string;

    public update() {
      this.survey = this.surveyService.getCurrentUserSurvey();
    }

    public logout() {
      this.userActions.logoutUser();
    }

    public usersUpdated() {
      this.currentUser = this.userService.getCurrentUser();
      this.outerTab = this.currentUser ? 'survey' : 'login';
    }
  }

  class SurveyLocationController extends ModelController {
    importanceTab: string;

    constructor(private surveyService: Services.Survey.SurveyService, private surveyActions: Services.Survey.SurveyActions) {
      super(surveyService);
      this.importanceTab = undefined;
    }

    public setLocationImportance(importance) {
      this.surveyActions.location.importance(importance);
    }

    public update() {
      var survey = this.surveyService.getCurrentUserSurvey();
      console.log(survey);
      if (survey) {
        this.importanceTab = survey.location.importance ? survey.location.importance : 'choose';
      }
    }
  }

  angular.module('gsc.survey', [])
    .directive('gscSurvey', GSC.FluxDirective.createFluxDirective({
      templateUrl: 'gscflux/survey/survey.html',
      controller: SurveyController
    }))

    .directive('gscSurveyLocation', GSC.FluxDirective.createFluxDirective({
      templateUrl: 'gscflux/survey/location.html',
      controller: SurveyLocationController
    }))

    .directive('gscSurveySubjects', GSC.FluxDirective.createFluxDirective({
      templateUrl: 'gscflux/survey/subjects.html',
      controller: function(surveyActions, surveyService: Services.Survey.SurveyService) {
        var i = 0;

        var shuffle = function(o){ //v1.0
          for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
          return o;
        };

        var updateSubjects = function() {
          var survey = surveyService.getCurrentUserSurvey();
          if (survey) {
            this.subjects = shuffle(survey.subjects);
          }
        };
        surveyService.addChangeListener(angular.bind(this, updateSubjects));
        updateSubjects();

        this.addSubject = function() {
          surveyActions.subjects.add({'text': 'subject ' + (++i)});
        }
      }
    }));

}
