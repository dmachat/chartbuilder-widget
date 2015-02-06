//////////////////
// Config

var QUERYSTRING_PREFIX = 'widget_',
    defaultParameters = {
      base_url: config.baseUrl

      // Default parameters go here

    };

require([ 'utils', 'loader.div', 'loader.script' ], function(utils, loadDivEmbeds, loadScriptEmbeds) {

  //
  // One can add silp params to the query string and they will be translated like:
  //
  //    widget_example_param -> example_param
  //
  var paramsQueryString = {};
  var document_params = utils.parseQueryString(document.location) || {};
  utils.each(document_params, function(val, key) {
    if (key.indexOf(QUERYSTRING_PREFIX) >= 0) {
      key = key.slice(QUERYSTRING_PREFIX.length);
      paramsQueryString[key] = val;
    }
  });

  var loadOne = function(paramsEmbed) {

    // Parameters are overriden in order (1 overrides 2, 2 overrides 3)
    //
    //  1. querystring parameters to embedding site
    //  2. querystring to load script src
    //  3. parameters in loader file
    //

    var parameters = utils.extend({}, defaultParameters, paramsEmbed, paramsQueryString);

    if (parameters.base_url !== defaultParameters.base_url) {

      //
      // Export RequireJS in global namespace if we set a custom base_url,
      // which is done because we want to either:
      //
      //  1. develop locally
      //  2. use a different version of the widget on a site we don't control
      //
      // For 1., we need define() globally, since we're working with the
      // files before they've gone through r.js. In case 2. it's okay - we
      // only risk breaking the embedding site for ourselves.
      //

      exports.define = namespace.define;
      exports.require = namespace.require;
      exports.requirejs = namespace.requirejs;

    }

    // Setup RequireJS and load the widget
    namespace.require.config({ baseUrl: parameters.base_url + '/js' });

    var isMobile = utils.isMobile.any();

    if (isMobile && parameters.element.dataset.image) {
      var chart = JSON.parse(parameters.element.dataset.chart);
      var chartbuilderWrapper = document.createElement('div');
      chartbuilderWrapper.className = 'chartbuilder-chart';
      var img = document.createElement('img');
      img.src = parameters.element.dataset.image;
      var title = document.createElement('h2');
      title.innerHTML = chart.meta.title;
      var subtitle = document.createElement('h4');
      subtitle.innerHTML = chart.meta.subtitle;
      var caption = document.createElement('p');
      caption.innerHTML = chart.meta.caption;
      var attribution = document.createElement('h6');
      attribution.innerHTML = chart.meta.attribution;
      chartbuilderWrapper.appendChild(title);
      chartbuilderWrapper.appendChild(subtitle);
      chartbuilderWrapper.appendChild(img);
      chartbuilderWrapper.appendChild(caption);
      chartbuilderWrapper.appendChild(attribution);
      parameters.el.appendChild(chartbuilderWrapper);
    } else if (!isMobile) {
      namespace.require([ 'app' ], function(App) {
        var app = new App(parameters);
      });
    } else {
      var text = document.createElement('h4');
      text.textContent = 'Charts are not supported on your device.';
      parameters.el.appendChild(text);
    }
  };

  // Find all embeds
  loadScriptEmbeds(loadOne);
  loadDivEmbeds(loadOne);

});

