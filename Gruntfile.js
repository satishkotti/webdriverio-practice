module.exports = function (grunt) {


	// By default just display a message
	grunt.registerTask('default', ['tasks']);

	// Instead of building all files we prompt the user on which build they want
	grunt.registerTask('tasks', function() {
		grunt.log.subhead('Please choose a grunt build:');
		grunt.log.ok('grunt build		builds everything');
		grunt.log.ok('grunt css		build css');
		grunt.log.ok('grunt js		build js');
		grunt.log.subhead('Ingestion targets:');
		grunt.log.error('grunt webmd-ingest:live');
		grunt.log.ok('grunt webmd-ingest:staging');
		grunt.log.ok('grunt webmd-ingest:perf');
		grunt.log.ok('grunt webmd-ingest:qa00');
		grunt.log.ok('grunt webmd-ingest:qa01');
	});
	// Build all
	grunt.registerTask('build', ['clean','copy:css','sass','autoprefixer','cssmin','jshint','uglify','replace:sourceMappingURL','webmd-zip']);
	// Build CSS
	grunt.registerTask('css', ['clean', 'copy:css','sass','autoprefixer','cssmin','webmd-zip']);
	// Build JS
	grunt.registerTask('js', ['clean','jshint','uglify','replace:sourceMappingURL','webmd-zip']);

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		// File Path Setup
		dirSrc : 'src',
		dirBuild : 'build',
		dirDist : 'dist',
		dirDctmPbJsPath : 'webmd/PageBuilder_Assets/JS/funded-editorial',
		dirDctmPbJsSourcemapPath : '../JS_static/funded-editorial',
		dirDctmPbJsRquirePath : 'webmd/consumer_assets/site_images/amd_modules/funded-editorial/1',
		dirDctmPbCssPath : 'webmd/PageBuilder_Assets/CSS/funded-editorial',
		dirDctmPbImgPath : 'webmd/consumer_assets/site_images/funded-editorial',
		fundedEditorialZip : 'ingest.zip',
		// Build Tasks
		clean: {
			all: ['dist','build','sourcemaps','ingest.zip']
		},
		copy: {
			css: {
				files: [{
					expand: true,
					cwd: '<%= dirSrc %>/css',
					src: ['*.css'],
					dest: '<%= dirBuild %>/<%= dirDctmPbCssPath %>/',
					ext: '.css'
				}, {
					expand: true,
					cwd: '<%= dirSrc %>/css/modules',
					src: ['*.css'],
					dest: '<%= dirBuild %>/modules/css/',
					ext: '.css'
				}]
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: 'none'
				},
				files: [{
					expand: true,
					cwd: '<%= dirSrc %>/css',
					src: ['*.scss'],
					dest: '<%= dirBuild %>/<%= dirDctmPbCssPath %>/',
					ext: '.css'
				}, {
					expand: true,
					cwd: '<%= dirSrc %>/css/modules',
					src: ['*.scss'],
					dest: '<%= dirBuild %>/modules/css/',
					ext: '.css'
				}]
			}
		},
		autoprefixer: {
			dist: {
				options: {
					browsers: ['last 2 versions', 'ie 8', 'ie 9']
				},
				src: '<%= dirBuild %>/**/*.css'
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: [{
					expand: true,
					cwd: '<%= dirBuild %>',
					src: ['<%= dirDctmPbCssPath %>/*.css'],
					dest: '<%= dirDist %>/'
				},
				{
					expand: true,
					cwd: '<%= dirBuild %>/modules/css',
					src: ['*.css'],
					dest: '<%= dirBuild %>/modules/css/min/',
					ext: '.min.css'
				}]
			}
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'<%= dirSrc %>/js/*.js',
				'<%= dirSrc %>/js/amd/*.js'
			]
		},
/*		concat: {
			js: {
				options: {
					separator: ';',
				},
				src: [
					'<%= dirSrc %>/js/lib/hc-sticky.min.js',
					'<%= dirSrc %>/js/funded-editorial.js'
				],
				dest: '<%= dirSrc %>/js/build/funded-editorial.js',
			}
		},*/
		uglify: {
			build: {
				options: {
					preserveComments: true, // set to true to keep comments in the code
					beautify: true, // set to true to expand the code
					mangle: false, // set to false to preserve variable names
				},
				files: [{
					expand: true,
					cwd: '<%= dirSrc %>/js',
					src: ['*.js'],
					dest: '<%= dirBuild %>/<%= dirDctmPbJsPath %>/'
				},
				{
					expand: true,
					cwd: '<%= dirSrc %>/js/amd',
					src: ['*.js'],
					dest: '<%= dirBuild %>/<%= dirDctmPbJsRquirePath %>/'
				}]
			},
			dist: {
				options: {
					preserveComments: false, // set to true to keep comments in the code
					compress: {
						drop_console: true // removes all console.log incase there left in the code
					},
					sourceMap: false,
					sourceMapIncludeSources: false
				},
				files:  [{
					expand: true,
					cwd: '<%= dirSrc %>/js',
					src: ['*.js'],
					dest: '<%= dirDist %>/<%= dirDctmPbJsPath %>/'
				},
				{
					expand: true,
					cwd: '<%= dirSrc %>/js/amd',
					src: ['*.js'],
					dest: '<%= dirDist %>/<%= dirDctmPbJsRquirePath %>/'
				}]
			}
		},
		replace: {
			sourceMappingURL: {
				src: ['<%= dirDist %>/<%= dirDctmPbJsPath %>/*.js'],
				overwrite: true,
				replacements: [{
					from: 'sourceMappingURL=',
					to: 'sourceMappingURL=<%= dirDctmPbJsSourcemapPath %>/'
				}]
			}
		},
		"webmd-zip" : {
			all: {
				src : '<%= dirDist %>/webmd',
				dest : '<%= fundedEditorialZip %>'
			}
		},
		'webmd-ingest' : {
			prodlive: {
				src : '<%= fundedEditorialZip %>',
				options : {
					'env' : 'prod',
					'lifeCycle' : 'active'
				}
			},
			prodstaging: {
				src : '<%= fundedEditorialZip %>',
				options : {
					'env' : 'prod',
					'lifeCycle' : 'staging'
				}
			},
			perflive: {
				src : '<%= fundedEditorialZip %>',
				options : {
					'env' : 'perf',
					'lifeCycle' : 'active'
				}
			},
			perfstaging: {
				src : '<%= fundedEditorialZip %>',
				options : {
					'env' : 'perf',
					'lifeCycle' : 'staging'
				}
			},
			qa00live: {
				src : '<%= fundedEditorialZip %>',
				options : {
					'env' : 'qa00',
					'lifeCycle' : 'active'
				}
			},
			qa00staging: {
				src : '<%= fundedEditorialZip %>',
				options : {
					'env' : 'qa00',
					'lifeCycle' : 'staging'
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			dist: {
				files: [
					'<%= dirSrc %>/css/**/*.scss',
					'<%= dirSrc %>/css/**/*.css',
					'<%= dirSrc %>/js/**/*.js'
				],
				tasks: ['build'],
				options: {
					spawn: false
				},
			}
		}
	});

};
