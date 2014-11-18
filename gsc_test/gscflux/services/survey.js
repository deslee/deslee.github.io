angular.module('gsc.services.survey', []).service('surveys', function(dispatcher) {

  var EventEmitter = require('events').EventEmitter,
    emitter = new EventEmitter(),
    CHANGE_EVENT = 'change',
    survey,
    dispatchToken = dispatcher.register(angular.bind(this, function(action) {
      switch(action.type) {
        case "INITIALIZE_MOCK_SURVEY":
              survey = {};
              this.emitChange();
              break;
        case "UPDATE_SURVEY":
              this.updateSurveyAction(action.data);
              break;
      }
    }));

  this.getSurvey = function() {
    var surveyViewModel = angular.copy(survey);
    Object.freeze(surveyViewModel);
    return surveyViewModel;
  };

  this.addChangeListener = function(callback) {
    emitter.on(CHANGE_EVENT, callback);
  };
  this.removeChangeListener = function(callback) {
    emitter.removeListener(CHANGE_EVENT, callback);
  };
  this.emitChange = function() {
    emitter.emit(CHANGE_EVENT);
  };
  this.getDispatchToken = function() {
    return dispatchToken;
  };

  this.updateSurveyAction = function(update) {
    survey[update.property] = update.value;
    this.emitChange();
  };

  dispatcher.dispatch({
    type: 'INITIALIZE_MOCK_SURVEY'
  })

});
