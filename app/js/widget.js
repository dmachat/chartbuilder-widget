define(function(require) {
  'use strict';

  var angular = require('angular'),
      angularDatamaps = require('angular-datamaps'),
      angularNvd3 = require('angular-nvd3'),
      data,
      id;

  var app = angular.module('chartbuilderCharts', ['datamaps', 'chartbuilder.nvd3']);

  app.init = function(params) {

    // Assign data attributes to variables
    id = params['element id'];
    data = angular.fromJson(params.element.attributes['data-chart'].value);
    data.template = params.element.attributes['data-template'].value;

    // Append the angular markup to render the chart
    var directiveMarkup = '<div class="container" ng-controller="chartbuilderUICtrl">' +
                            '<div chartbuilder-chart data="pageCharts[\'' + id + '\']" class="chartbuilder-chart"></div>' +
                          '</div>';
    angular.element(params.el)
      .append(directiveMarkup);

    // Finally, bootstrap the widget module
    angular.bootstrap(params.el, ['chartbuilderCharts']);
  };

  app.directive('chartbuilderChart', ['$compile', function($compile) {
      return {
        restrict: 'EA',
        scope: {
          data: '=?'
        },

        link: function(scope, element) {
          scope.dataStore = scope.data;

          // Decode meta fields
          angular.forEach(scope.dataStore.meta, function(value, key) {
            scope.dataStore.meta[key] = decodeURIComponent(value);
          });

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
          scope.build(childScope);
        }
      };
    }])
    .controller('chartbuilderUICtrl', ['$scope', function($scope) {
      $scope.pageCharts = {};
      $scope.pageCharts[id] = data;
    }]);

  return app;

});
