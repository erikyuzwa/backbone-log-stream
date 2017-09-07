
module.exports = function (grunt) {

	// require it at the top and pass in the grunt instance
	require('time-grunt')(grunt);

	// load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jasmine: {
			src: ['backbone.log-stream.js'],
			options: {
				helpers: [
					'node_modules/sinon/pkg/sinon.js'
				],
				specs: 'spec/**/*.spec.js',
				vendor: [
					'lib/jquery/dist/jquery.min.js',
					'lib/underscore/underscore.js',
					'lib/backbone/backbone.js'
				],
				phantomjs: {'ignore-ssl-errors': true},
				version: '2.2.0'
			}
		},

		connect: {
			spec: {
				options: {
					port: 3000
				}
			}
		},

		uglify: {
			options: {
				banner: '/*  <%= pkg.name %> v<%= pkg.version %> ' +
				"(<%= grunt.template.today('yyyy-mm-dd') %>)\n" +
				"  by <%= pkg.author %> - <%= pkg.repository.url %>\n" +
				' */\n',
				mangle: {
					reserved: ['_', 'Backbone']
				}
			},
			dist: {
				files: {
					'backbone.log-stream.min.js': ['backbone.log-stream.js']
				}
			}
		},

		watch: {
			files: '<%= jshint.files %>',
			tasks: ['jshint', 'jasmine']
		},

		jshint: {
			files: ['backbone.log-stream.js', 'spec/**/*.spec.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		}
	});

	grunt.registerTask('build', ['jshint', 'uglify']);

	grunt.registerTask('serve', ['jshint', 'jasmine']);

	grunt.registerTask('spec-server', ['jasmine::build', 'connect:spec:keepalive']);

	// Default task.
	grunt.registerTask('default', ['build']);

};
