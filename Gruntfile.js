/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: [
                    'public/assets/script/jessie.js',
                    'public/assets/script/time.js',
                    'public/assets/script/time.config.js',
                    'public/assets/script/time.utils.js',
                    'public/assets/script/time.clock.js',
                    'public/assets/script/time.carousel.js'
                ],
                dest: 'public/assets/script/time.prod.js'
            },
            css: {
                src: [
                    'public/assets/style/reset.css',
                    'public/assets/style/master.css',
                    'public/assets/style/mediaQuery.css'
                ],
                dest: 'public/assets/style/time.prod.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'public/assets/script/time.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        cssmin: {
            css: {
                src: ['<%= concat.css.dest %>'],
                dest: 'public/assets/style/time.min.css'
            }
        }
    });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};
