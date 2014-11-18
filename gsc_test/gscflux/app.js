angular.module('gsc', [
  'gsc.tabs',
  'gsc.survey',
  'gsc.services.survey',
  'gsc.eventDispatcher',
  'gsc.actions'
]).run(function() {
  console.log("gsc module loaded");
});
