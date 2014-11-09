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
          mainConfigFile: "app/js/app.js",
          out: "dist/release/js/app.js",
          name: "app"
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

    copy: {
      main: {
        files: [
          {
            src: [ 'app/img/*' ],
            dest: 'dist/release/img/',
            flatten: true,
            expand: true
          },
          {
            src: [ 'app/css/*' ],
            dest: 'dist/release/css/',
            flatten: true,
            expand: true
          }
        ]
      }
    }

  });

  grunt.registerTask('build', [
    'clean',
    'requirejs',
    'copy'
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
