/* inject:ts */ /// <reference path="../../references.ts" />
 /* endinject */

module GSC.Services.Survey {

  export interface ISurveyLocationModel {
    importance: string;
  }

  export interface ISurveyModel {
    userName: string;
    subjects: any[];
    location: ISurveyLocationModel;
  }

  export class SurveyService extends EntityService {
    private surveys : ISurveyModel[] = [];
    private currentUser;

    constructor(public dispatcher: EventDispatcher.Dispatcher, private userService: Services.User.UserService) {
      super(dispatcher);
    }

    public getAllSurveys(): ISurveyModel[] {
      var surveyViewModel = angular.copy(this.surveys);
      Object.freeze(surveyViewModel);
      return surveyViewModel;
    }

    public getCurrentUserSurvey() : ISurveyModel {
      var survey = this._getCurrentUserSurvey();
      if (survey) {
        var surveyViewModel = angular.copy(survey);
        Object.freeze(surveyViewModel);
        return surveyViewModel;
      }
    }

    private _getCurrentUserSurvey() : ISurveyModel {
      if (this.currentUser) {
        var results = this.surveys.filter((survey: any) => {
          return survey.userName == this.currentUser.name;
        });
        if (results.length > 0) {
          return results[0]
        }
      }
    }

    public updateSurveyAction(data) {
      var currentUserSurvey = this._getCurrentUserSurvey();
      if (currentUserSurvey) {
        data.value(currentUserSurvey);
      }
    }

    public update(payload: EventDispatcher.Payload) {
      this.dispatcher.waitFor(this.userService.getDispatchToken);
      switch(payload.type) {
        case EventDispatcher.PayloadType.UPDATE_SURVEY:
          this.updateSurveyAction(payload.data);
          break;
        case EventDispatcher.PayloadType.LOGIN_USER:
          this.currentUser = payload.data;
          var results = this.surveys.filter((survey: any) => {
            return survey.userName == this.currentUser.name;
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
    }
  }

  angular.module('gsc.services.survey', []).service('surveyService', SurveyService);
}
