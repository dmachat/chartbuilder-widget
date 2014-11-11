module.exports = function(grunt) {

  require('load-grunt-config')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    subgrunt: {
      loader: {
        'loader': 'default'
      }
    },

    requirejs: {
      compile: {
        options: {
          mainConfigFile: 'app/js/app.js',
          out: 'dist/release/js/app.js',
          name: 'app'
        }
      }
    },

    clean: {
      dist: [
        'dist/*'
      ]
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['app/**/*.js', 'loader/**/*.js'],
        tasks: ['build']
      }
    },

  });

  grunt.registerTask('build', [
    'clean',
    'requirejs'
  ]);
  grunt.registerTask('server', [
    'subgrunt:loader',
    'connect:livereload',
    'watch'
  ]);
  grunt.registerTask('browser', [
    'subgrunt:loader',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('default', 'server');

};
