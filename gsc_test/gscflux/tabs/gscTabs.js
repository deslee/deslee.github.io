angular.module('gsc.tabs', [])

.directive('gscTabs', function() {
  return {
    transclude: true,
    replace: true,
    template:
      '<div class="gsc-tabs-content" ng-transclude>' +
      '</div>',
    compile: function(element, attributes) {
    },
    link: function(scope, element, attrs) {
    },
    controller: function($scope) {
      var tabs = [];
      this.registerTab = function(tab) {
        tabs.push(tab);
        if ($scope.selectedTab == undefined) {
          $scope.selectedTab = tab.name;
        }
      };
      $scope.$watch('selectedTab', angular.bind(this, function(newVal, oldVal) {
        tabs.forEach(function(tab) {
          tab.visible = tab.name == newVal;
        })
      }));
    },
    scope: {
      selectedTab: '='
    }
  }
})

.directive('gscTab', function() {
  return {
    transclude: true,
    replace: true,
    require: '^gscTabs',
    template: '<div ng-transclude ng-show="visible"></div>',
    link: function(scope, element, attrs, tabs) {
      scope.visible = false;
      tabs.registerTab(scope);
    },
    scope: {
      name: '@'
    }
  }
})


;

