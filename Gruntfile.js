var shell = require('shelljs')

//shell.exec('node server.js')

module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			reload: {
				files: ['views/*.jade','css/*.css'],
				options: {
					livereload: 13313
				}
			},
			js: {
				files: ['js/src/*.es6','js/utilities/src/*.es6'],
				tasks: ['babel','webpack:dev']
			},
			css: {
				files: 'css/src/*.sass',
				tasks: ['sass:dev']
			}
		},
		babel: {
			options: {
				sourceMap: true
			},
			dev_models: {
				files: [{
					expand: true,
					cwd: './js/models/src',
					src: ['*.es6'],
					dest: './models/',
					ext: '.model.js'
				}]
			},
			dev_utilities: {
				files: [{
					expand: true,
					cwd: 'js/utilities/src',
					src: ['index.es6'],
					dest: 'js/utilities',
					ext: '.util.js'
				}]
			},
			dev_scripts: {
				files: [{
					expand: true,
					cwd: './js/src',
					src: ['*.es6'],
					dest: './js/',
					ext: '.js'
				}]
			}
		},
		webpack: {
			dev: {
				entry: './js/entry.js',
				output: {
					path: 'dev/js',
					filename: 'entry.js'
				},
				watch: false
			}
		},
		sass: {
			source: {
				options: {
					style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: './css/src',
					src: ['*.sass'],
					dest: './css',
					ext: '.css'
				}]
			},
			dev: {
				options: {
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: './css/src',
					src: ['*.sass'],
					dest: './dev/css',
					ext: '.css'
				}]
			}
		}
	})
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-babel')
	grunt.loadNpmTasks('grunt-webpack')
	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.registerTask('default',['watch','babel','webpack','sass'])
	//grunt.registerTask('watch', ['watch'])
}