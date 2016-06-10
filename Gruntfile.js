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
                files: ['build/sass/**/*.scss', '!build/sass/admin/**/*.scss', '!build/sass/widget/controls/**/*.scss'],
                tasks: ['sass:front', 'autoprefixer:front', 'notify:sass']
            },
            sass_widget: {
                files: ['build/sass/widget/controls/**/*.scss'],
                tasks: ['sass:widget_controls', 'autoprefixer:widget_controls', 'notify:sass_widget']
            },
            js: {
                files: ['build/js/**/*.js', '!build/js/admin/**/*.js', '!build/js/widget/**/*.js'],
                tasks: ['uglify:front', 'notify:js']
            },
            js_admin: {
                files: ['build/js/admin/**/*.js'],
                tasks: ['uglify:admin', 'notify:js_admin']
            },
            js_widget: {
                files: ['build/js/widget/**/*.js']  ,
                tasks: ['uglify:widget', 'notify:js_widget']
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
            widget_controls: {
                files: {
                    'widget-controls.css': 'build/sass/widget/controls/main.scss'
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
            widget_controls: {
                src: 'widget-controls.css'
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
                        'build/vendor/js/countdown.min.js',
                        'build/vendor/js/konami.js',
                        // Plugin scripts
                        'build/js/**/*.js',
                        '!build/js/widget/**/*.js',
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
            widget: {
                files: {
                    'widget-controls.js': [
                        // Vendor files
                        'build/vendor/js/jquery.clockpicker.js',
                        'build/vendor/js/picker.js',
                        'build/vendor/js/picker.date.js',
                        // Widget scripts
                        'build/js/widget/controls/**/*.js',
                    ],
                    'widget-frontend.js': [
                        'build/js/widget/front/**/*.js',
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
            js_widget: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'JS Widget Complete'
                }  
            },
            sass: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'SASS Complete'
                }
            },
            sass_widget: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'SASS Widget Controls Complete'
                }
            }
        }

    });

    // Register our main task
    grunt.registerTask('default', ['watch']);
};