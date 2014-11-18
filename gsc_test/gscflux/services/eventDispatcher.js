angular.module('gsc.eventDispatcher', []).factory('dispatcher', function() {
  var Dispatcher = require('flux').Dispatcher;
  return new Dispatcher();
});
