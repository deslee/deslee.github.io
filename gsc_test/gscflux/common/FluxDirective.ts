/* inject:ts */ /// <reference path="../references.ts" />
 /* endinject */

module GSC.FluxDirective{
  export interface FluxDirectiveParameters {
    templateUrl?: string;
    template?: string;
    controller: any;
    scope?: any;
  }

  export function createFluxDirective(params: FluxDirectiveParameters, name?: string) {
    var directive : any = {
      controller: params.controller,
      scope: params.scope ? angular.extend({}, params.scope) : {},
      controllerAs: name ? name : 'view'
    };

    if (params.templateUrl) {
      directive.templateUrl = params.templateUrl
    }
    if (params.template) {
      directive.template = params.template;
    }
    return () => directive;
  }

}
