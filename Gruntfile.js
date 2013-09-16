/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                src: 'public/**',
                dest: 'dist/',
                dot: true
            }
        },
        clean: {
            folderStructure: ['dist'],
            dist: [
                'dist/public/assets/style/*.css',
                'dist/public/assets/script/*.js'
            ]
        },
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
                dest: 'dist/public/assets/script/time.min.js'
            },
            css: {
                src: [
                    'public/assets/style/reset.css',
                    'public/assets/style/master.css',
                    'public/assets/style/mediaQuery.css'
                ],
                dest: 'dist/public/assets/style/time.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/public/assets/script/time.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        cssmin: {
            css: {
                src: ['<%= concat.css.dest %>'],
                dest: 'dist/public/assets/style/time.min.css'
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
                        //'dist/public/assets/img/*.png',
                        'dist/public/assets/fonts/*.{eot,svg,ttf,woff}',
                        'dist/public/assets/script/*',
                        'dist/public/assets/style/*',
                        'dist/public/*.{png,ico}'
                    ]
                }]
            }
        },
        'useminPrepare': {
            html: [
                'dist/public/index.php',
                'dist/public/includes/headerIcons.inc.php'
            ]
        },
        usemin: {
            html: [
                'dist/public/index.php',
                'dist/public/includes/headerIcons.inc.php'
            ],
            css: ['dist/public/assets/style/*.css'],
            options: {
                dirs: ['dist']
            }
        },
        replace: {
            application_environment_value: {
                src: ['dist/public/.htaccess'],
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
                    cwd: 'dist/public/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/public/'
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
    grunt.registerTask('default', [
        'clean:folderStructure',
        'copy',
        'clean:dist',
        'concat',
        'uglify',
        'cssmin',
        'rev',
        'usemin',
        'replace',
        'imagemin'
    ]);
};
