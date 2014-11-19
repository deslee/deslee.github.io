/* inject:ts */ /// <reference path="references.ts" />
 /* endinject */

var angular: ng.IAngularStatic = window['angular'];
declare var EventEmitter;
declare function require(name: string);

module GSC {
  console.log('running gsc module');

  angular.module('gsc', [
    'gsc.services.survey',
    'gsc.surveyActions',
    'gsc.userActions',
    'gsc.services.user',
    'gsc.eventDispatcher',

    'gsc.tabs',
    'gsc.survey',
    'gsc.user',
  ]);
}
