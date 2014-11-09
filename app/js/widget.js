define([
  'angular',
  'd3',
  'topojson',
  'datamaps',
  'list_globals',
  'nvd3',
  'angular-datamaps',
  'angular-nvd3'], function(angular, d3, topojson, Datamap, listGlobals) {

  var Widget = function(params) {
    console.log('hello');

    /*
    var $el = $(params.el);

    var globals = listGlobals();
    var fragment = _.reduce(globals, function(html, global) {
      return html + '<li><code>' + global + '</code></li>\n';
    }, '');

    $el
      .append('grunt, RequireJS, underscore and jQuery made me be')
      .append("<p>I'm guilty of these globals:</p>")
      .append($('<ul/>').html(fragment));
    */

  };

  return Widget;

});
