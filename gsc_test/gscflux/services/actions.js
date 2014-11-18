angular.module('gsc.actions', ['gsc.eventDispatcher']).service('surveyActions', function(dispatcher) {
  this.location = {
    importance: function(importance) {
      dispatcher.dispatch({
        type: "UPDATE_SURVEY",
        data: {
          property: "location.importance",
          value: importance
        }
      })
    }
  }
});
