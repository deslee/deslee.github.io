angular.module('gsc.survey', [])
  .directive('gscSurvey', function(surveys, dispatcher) {
    return {
      templateUrl: 'gscflux/survey/survey.html',
      controller: function($scope) {
        var updateSurvey = function() {
          $scope.survey = surveys.getSurvey();
        };

        surveys.addChangeListener(angular.bind(this, updateSurvey));
        updateSurvey();
      }
    }
  })

  .directive('gscSurveyLocation', function() {
    return {
      templateUrl: 'gscflux/survey/location.html',
      controller: function($scope, surveyActions) {
        $scope.setLocationImportance = function(importance) {
          surveyActions.location.importance(importance);
          $scope.selectedTab = importance;
        }
      }
    }
  })

  .directive('gscSurveySubjects', function() {
    return {
      templateUrl: 'gscflux/survey/subjects.html'
    }
  });
