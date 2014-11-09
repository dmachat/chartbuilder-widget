'use strict';

module.exports = function(grunt) {

  require('load-grunt-config')(grunt);

  var config = require('./js/config');

  grunt.initConfig({
    config: {
      js: 'chartbuilder.load.v1.default.js'
    },

    requirejs: {
      compile: {
        options: {
          namespace : config.namespace,
          baseUrl   : './js',
          name      : 'main',
          out       : 'dist/main.js',
          // We minify the whole thing in the end instead
          optimize  : 'none'
        }
      }
    },

    concat: {
      dist: {
        src: ['js/config.js', 'dist/main.min.js'],
        dest: 'dist/<%= config.js %>'
      },
      debug: {
        src: ['js/config.js', 'vendor/require.js', 'js/require.js', 'dist/main.js'],
        dest: 'dist/<%= config.js %>'
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'dist/main.min.js': ['vendor/require.js', 'js/require.js', 'dist/main.js']
        }
      }
    },

    clean: {
      pre: ['dist'],
      post: ['dist/main.js', 'dist/main.min.js']
    }

  });

  grunt.registerTask('wrap', 'Wraps source files with specified header and footer', function() {

    var path = 'dist/chartbuilder.load.v1.default.js',
        before = '(function() {\n',
        after = '\n}());',
        content = grunt.file.read(path);

    grunt.file.write(path, before + content + after);

    grunt.log.writeln('Wrapped "' + path + '" in an IIFE');

  });

  grunt.registerTask('build', [
    'requirejs',
    'uglify:dist',
    'concat:dist'
  ]);

  grunt.registerTask('default', [
    'clean:pre',
    'build',
    'clean:post',
    'wrap',
  ]);

  grunt.registerTask('debug', [
    'clean:pre',
    'requirejs',
    'concat:debug',
    'clean:post',
    'wrap'
  ]);
};
