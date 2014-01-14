module.exports = function(grunt) {
    'use strict';

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({

        pkg: pkg,

        dirs: {

            public: {
                root: 'public/'
            },

            dist: {
                root: 'dist/',
                assets: '<%= dirs.dist.root %>assets',
                css: '<%= dirs.dist.root %>assets/css/',
                js: '<%= dirs.dist.root %>assets/js/',
                font: '<%= dirs.dist.root %>assets/font/',
                img: '<%= dirs.dist.root %>assets/img/'
            },

            tmp: {
                root: '.tmp'
            }
        },

        clean: {

            dist: [ '<%= dirs.dist.root %>' ],

            assets: [
                '<%= dirs.dist.css %>*.css',
                '<%= dirs.dist.js %>*.js'
            ],

            tmp: [ '<%= dirs.tmp.root %>' ]
        },

        copy: {

            options: {
                encoding: 'utf8'
            },

            main: {

                expand: true,
                cwd: '<%= dirs.public.root %>',
                src: '**',
                dest: '<%= dirs.dist.root %>',
                dot: true
            }
        },

        uglify: {

            options: {

                report: 'gzip'
            }
        },

        rev: {

            options: {

                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },

            assets: {

                files: [{

                    src: [
                        '<%= dirs.dist.img %>**/*.{png,jpg,gif,svg}',
                        '<%= dirs.dist.font %>*.{eot,svg,ttf,woff}',
                        '<%= dirs.dist.js %>*',
                        '<%= dirs.dist.css %>*',
                        '<%= dirs.dist.root %>*.{png,ico}'
                    ]
                }]
            }
        },

        'useminPrepare': {

            html: '<%= dirs.dist.root %>index.php'
        },

        usemin: {

            html: {

                src: [ '<%= dirs.dist.root %>index.php' ],

                options: {

                    assetsDirs: [

                        '<%= dirs.dist.root %>',
                        '<%= dirs.dist.assets %>'
                    ]
                }
            },

            css: {

                src: '<%= dirs.dist.css %>*.css'
            }
        },

        replace: {

            application_environment_value: {

                src: [ '<%= dirs.dist.root %>.htaccess' ],

                overwrite: true,

                replacements: [{

                    from: /(development)/g,

                    to: 'production'
                }]
            }
        },

        imagemin: {

            dynamic: {

                files: [{

                    expand: true,

                    cwd: '<%= dirs.dist.root %>',

                    src: [ '**/*.{png,jpg,gif}' ],

                    dest: '<%= dirs.dist.root %>'
                }]
            }
        }
    });

    // tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // default task
    grunt.registerTask('default', 'Create a dist build ready for production', [
        'clean:dist',
        'copy',
        'useminPrepare',
        'concat',
        'clean:assets',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'clean:tmp',
        'replace',
        'imagemin'
    ]);
};
