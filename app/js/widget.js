define(function(require) {
  'use strict';

  var angular = require('angular'),
      angularDatamaps = require('angular-datamaps'),
      angularNvd3 = require('angular-nvd3');

  var app = angular.module('chartbuilderCharts', ['datamaps', 'chartbuilder.nvd3']);

  app.init = function(params) {
    angular.bootstrap(params.el, ['chartbuilderCharts']);
  };

  app.value('pageCharts', {})

  app.directive('chartbuilderChart', ['$compile', function($compile) {
      return {
        restrict: 'EA',
        scope: {
          data: '=?'
        },

        link: function(scope, element) {
          scope.dataStore = scope.data;

          // Define child scope and template
          var childScope = scope.$new();

          // Define build template function
          scope.build = function(_scope) {
            var template = [
              '<h2>{{ data.meta.title }}</h2>',
              '<h4>{{ data.meta.subtitle }}</h4>',
              scope.data.template,
              '<p>{{ data.meta.caption }}</p>',
              '<h6 ng-if="data.meta.attribution">{{ data.meta.attribution }}</h6>'
            ].join('');
            element.html('').append($compile(template)(_scope));
          };

          // Refresh directive when data changes
          scope.$watch('data', function(data) {
            if (angular.isUndefined(data) || angular.isUndefined(data.template)) {
              return false;
            }
            childScope.$destroy();
            childScope = scope.$new();
            scope.build(childScope);
          }, true);

          // Build template view
          //scope.build(childScope);
        }
      };
    }])
    .controller('chartbuilderUICtrl', ['$scope', 'pageCharts', function($scope, pageCharts) {
      $scope.pageCharts = pageCharts;
    }]);

  return app;

});
