'use strict';
module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Define watch tasks
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['build/sass/**/*.scss', '!build/sass/admin/**/*.scss'],
                tasks: ['sass:front', 'autoprefixer:front', 'notify:sass']
            },
            js: {
                files: ['build/js/**/*.js', '!build/js/admin/**/*.js', '!build/js/customizer/**/*.js', '!build/js/tinymce/**/*.js', '!build/js/quick-edit/**/*.js'],
                tasks: ['uglify:front', 'notify:js']
            },
            js_admin: {
                files: ['build/js/admin/**/*.js'],
                tasks: ['uglify:admin', 'notify:js_admin']
            },
            js_customizer: {
                files: ['build/js/customizer/**/*.js']  ,
                tasks: ['uglify:customizer', 'notify:js_customizer']
            },
            livereload: {
                files: ['**/*.html', '**/*.php', 'build/images/**/*.{png,jpg,jpeg,gif,webp,svg}', '!**/*ajax*.php']
            }
        },

        // SASS
        sass: {
            options: {
                sourceMap: true
            },
            front: {
                files: {
                    'style.css': 'build/sass/main.scss'
                }
            },
        },

        // Auto prefix our CSS with vendor prefixes
        autoprefixer: {
            options: {
                map: true
            },
            front: {
                src: 'style.css'
            },
        },

        // Uglify and concatenate
        uglify: {
            options: {
                sourceMap: true
            },
            front: {
                files: {
                    'script.js': [
                        // Vendor files

                        // Plugin scripts
                        'build/js/**/*.js',
                        '!build/js/customizer/**/*.js',
                    ]
                }
            },
            admin: {
                files: {
                    'admin.js': [
                        'build/js/admin/**/*.js',
                    ]
                }
            },
            customizer: {
                files: {
                    'customizer-controls.js': [
                        'build/js/customizer/controls/**/*.js',
                    ],
                    'customizer-preview.js': [
                        'build/js/customizer/preview/**/*.js',
                    ]
                }
            }
        },

        notify: {
            js: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'JS Complete'
                }
            },
            js_admin: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'JS Admin Complete'
                }
            },
            js_customizer: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'JS Customizer Complete'
                }  
            },
            sass: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'SASS Complete'
                }
            }
        }

    });

    // Register our main task
    grunt.registerTask('default', ['watch']);
};