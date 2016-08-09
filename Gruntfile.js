module.exports = function (grunt) {

  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     uglify: {
       options: {
         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
       },
       build: {
        files: {
          'dist/testgame.min.js': ['src/js/*.js']
        }
        }
     },
     processhtml: {
       dist: {
         options: {
           process: true,
           data: {
             title: 'Game Title',
           }
         },
         files: {
           'dist/index.min.html': ['src/index.html']
         }
       }
     },
     htmlmin: {
       dist: {
         options: {
           removeComments: true,
           collapseWhitespace: true
         },
         files: {
           'dist/index.html': 'dist/index.min.html'
         }
       }
     },

     compress: {
      main: {
        options: {
          archive: 'dist/game.zip',
          mode: 'zip'
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: './',
          src: ['dist/index.html'],
          dest: './'
        }]
      }
    },

     clean: ['dist*//*.min.*']


   });

  var fs = require('fs');
  grunt.registerTask('sizecheck', function() {
    var done = this.async();
    fs.stat('dist/game.zip', function(err, zip) {
      if (zip.size > 13312) {
        //If size in bytes greater than 13kb
        grunt.log.error("Zipped file greater than 13kb \x07 \n");
        grunt.log.error("Zip is " + zip.size + " bytes when js13k max is 13,312 bytes");
      }
      done();
    });
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.registerTask('default', ['uglify', 'processhtml', 'htmlmin','clean','compress','sizecheck']);
};