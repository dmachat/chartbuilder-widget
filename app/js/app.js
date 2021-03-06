//
// Entry point for App
//
// Authors:
//
//    Drew Machat <drew@alleyinteractive.com>
//

//
// RequireJS configuration
// -----------------------
//
// We have to put config here, or else it might not be loaded before other
// modules, resulting in wrong dependency paths
//

require.config({
    deps: [],
    paths: {
      // Libraries
      'underscore': '../../vendor/underscore.amd',
      'angular': '../../bower_components/angular/angular.min',
      'd3': '../../bower_components/d3/d3.min',
      'nvd3': '../../bower_components/nvd3/nv.d3.min',
      'topojson': '../../bower_components/topojson/topojson',
      'datamaps': '../../vendor/modules/datamaps.all',

      // Angular modules
      'angular-datamaps': '../../vendor/modules/angular-datamaps',
      'angular-nvd3': '../../vendor/modules/angular-nvd3',
      'chartbuilder-options': '../../vendor/modules/options-constants',
    },

    shim: {
      'angular': {
        exports: 'angular'
      },
      'd3': {
        exports: 'd3'
      },
      'nvd3': {
        exports: 'nv',
        deps: ['d3']
      },
      'datamaps': ['d3', 'topojson'],
      'angular-datamaps': ['angular', 'datamaps'],
      'chartbuilder-options': ['angular', 'd3'],
      'angular-nvd3': ['chartbuilder-options']
    },

    // The r.js compiler will pick this up and enclose everything under this namespace.
    namespace: 'ChartbuilderGlobal'
});

(function(exports) {

  define(
    ['widget'],

    function(Widget) {

      // We create this hollow App object that proxies Widget to make a clean
      // cut - in `widget.js` we have RequireJS all setup and no longer need to
      // think of enclosure and configuration and such.

      var App = function(params) {
        return Widget.init(params);
      };

      App.prototype = Widget.prototype;
      return App;

    }
  );

}(this));
