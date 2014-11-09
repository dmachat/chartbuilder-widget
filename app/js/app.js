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
      'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min',
      'd3': '//cdnjs.cloudflare.com/ajax/libs/d3/3.4.13/d3.min',
      'nvd3': '//cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.15-beta/nv.d3.min',
      'topojson': '//cdnjs.cloudflare.com/ajax/libs/topojson/1.1.0/topojson.min',
      'datamaps': '//dmachat.github.io/angularjs-d3-chartbuilder/bower_components/datamaps/dist/datamaps.all',

      // Angular modules
      'angular-datamaps': '//dmachat.github.io/angularjs-d3-chartbuilder/scripts/angular_modules/datamaps/angular-datamaps',
      'angular-nvd3': '//dmachat.github.io/angularjs-d3-chartbuilder/scripts/angular_modules/nvd3-modules/angular-nvd3'
    },

    shim: {
      // Shim nvd3
      'nvd3': ['d3'],
      'chartbuilder.nvd3': ['angular', 'nvd3'],

      // Shim Datamaps
      'topojson': ['d3'],
      'datamaps': ['angular', 'd3', 'topojson'],
      'angular-datamaps': ['d3', 'topojson', 'datamaps']
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
        return Widget.apply(this, arguments);
      };

      App.prototype = Widget.prototype;
      return App;

    }
  );

}(this));

