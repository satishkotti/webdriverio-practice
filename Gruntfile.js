module.exports = function (grunt) {

    // Build all
    grunt.registerTask('default', ['clean','sass','autoprefixer','cssmin','uglify']);
    // Build CSS
    grunt.registerTask('css', ['clean','sass','autoprefixer','cssmin']);
    // Build JS
    grunt.registerTask('js', ['clean','uglify']);

    // Zip Files
    grunt.registerTask('zip', ['webmd-zip']);

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // File Path Setup
        dirSrc : 'src',
        dirBuild : 'build',
        dirDist : 'dist',
        dirDctmPbJsPath : 'webmd/PageBuilder_Assets/JS/funded-editorial',
        dirDctmPbJsRquirePath : 'webmd/consumer_assets/site_images/amd_modules',
        dirDctmPbCssPath : 'webmd/PageBuilder_Assets/CSS/funded-editorial',
        dirDctmPbImgPath : 'webmd/consumer_assets/site_images/funded-editorial',
        fundedEditorialZip : 'zip/funded-editorial.zip',

        // Build Tasks
        clean: {
            all: ['dist','build','sourcemaps','zip']
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {
                    '<%= dirSrc %>/css/funded-editorial.css' : '<%= dirSrc %>/css/funded-editorial.scss'
                }
            }
        },
        autoprefixer: {
            dist: {
                options: {
                    browsers: ['last 2 versions', 'ie 8', 'ie 9']
                },
                src: '<%= dirSrc %>/css/funded-editorial.css',
                dest: '<%= dirBuild %>/css/funded-editorial.css'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    '<%= dirDist %>/<%= dirDctmPbCssPath %>/funded-editorial.min.css' : '<%= dirBuild %>/css/funded-editorial.css'
                }
            }
        },
        uglify: {
            build: {
                options: {
                    preserveComments: true, // set to true to keep comments in the code
                    beautify: true, // set to true to expand the code
                    mangle: false, // set to false to preserve variable names
                    compress: {
                        drop_console: false // removes all console.log incase there left in the code
                    }
                },
                files: {
                    '<%= dirBuild %>/js/funded-editorial.js' : '<%= dirSrc %>/js/funded-editorial.js'
                }
            },
            dist: {
                options: {
                    preserveComments: false, // set to true to keep comments in the code
                    beautify: false, // set to true to expand the code
                    mangle: true, // set to false to preserve variable names
                    compress: {
                        drop_console: true // removes all console.log incase there left in the code
                    }
                },
                files: {
                    '<%= dirDist %>/<%= dirDctmPbJsPath %>/funded-editorial.js' : '<%= dirSrc %>/js/funded-editorial.js'
                }
            }
        },
        "webmd-zip" : {
            all: {
                src : '<%= dirDist %>/webmd',
                dest : '<%= fundedEditorialZip %>'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            dist: {
                files: [
                    '<%= dirSrc %>/css/**/*.scss',
                    '<%= dirSrc %>/js/**/*.js'
                ],
                tasks: ['default'],
                options: {
                    spawn: false
                },
            }
        }
    });

};
