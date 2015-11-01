// SERVER

'use strict';
// Modules

	// Core modules
	const fs = require('fs')

	// Vendor modules
	const express = require('express')
	const r = require('rethinkdb')
	const chalk = require('chalk')
	const db = require('./db.js')

// SETUP
	const access = chalk.bold.green
	const info = chalk.cyan
	const err = chalk.bold.red
	const app = express()

	app.set('env','development')
	app.set('views','./views')
	app.set('view engine','jade')

	app.locals.site_title = 'Trackstar'
	app.locals.email = 'geoffdavis92@gmail.com'
	app.locals.port = 19920
	app.locals.pageData = {
		home: {
			"title": "Home",
			"route": "/",
			"script": true
		},
		about: {
			"title": "About",
			"route": "/about",
			"desc": "About Moneybox",
			"script": true
		},
		entry: {
			"title": "Entry",
			"route": "/entry",
			"desc": "Enter workouts into your records",
			"script": true,
			"entry_form": {
				"fields": [
					{
						"name": "date",
						"ig": true,
						"label": {
							"text": "Date:",
							"iga": true
						},
						"input": {
							"type": "date",
							"class": ""
						}
					},
					{
						"name": "temperature",
						"ig": true,
						"label": {
							"text": "temperature",
							"iga": true
						},
						"input": {
							"type": "number"
						},
						"labelEnd": {
							"el": "label",
							"text": "°F"
						}
					},
					{
						"name": "duration",
						"ig": true,
						"label": {
							"text": "Duration:",
							"iga": true
						},
						"input": {
							"type": "number"
						},
						"labelEnd": {
							"el": "label",
							"text": "min."
						}
					},
					{
						"name": "workout",
						"ig": false,
						"indent": false,
						"label": {
							"text": "Workout:",
							"iga": false
						},
						"input": {
							"el": "select",
							"class": "form-control button-after form_type_setter",
							"children": {
								"el": "option",
								"text": [
									"Run",
									"Bike",
									"Swim",
									"Weightlift",
									"Hike"
								]
							}
						}
					}
				]
			}
		},
		log: {
			"title": "Log",
			"route": "/log",
			"desc": "Log of money spent",
			"script": true
		},
		analysis: {
			"title": "Reports",
			"route": "/reports",
			"desc": "ANALYZE",
			"script": true
		}
	}

	app.use('/node_modules', express.static(`${__dirname}/node_modules`))
	app.use('/data', express.static(`${__dirname}/data`))
	app.use('/css', express.static(`${__dirname}/css`))
	app.use('/js', express.static(`${__dirname}/js`))
	app.use('/dev/js', express.static(`${__dirname}/dev/js`))

// START SERVER
	app.listen(app.locals.port)
	console.log(access('App listening on port'), info(app.locals.port))

// ROUTING
	app.get(['/','/index','/index.html','/home'], (req,res) => {
		var date = new Date()
		var dateStr = `@ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
		console.log(access(`Access ${req.path} | `), info(dateStr))
		if (Object.keys(req.query).length !== 0) {
			var str = ""
			var getStr = function () {
				for (let prop in req.query) {
					str += `${prop} => ${req.query[prop]}, `
				}
				return str
			}
			console.log(info(`Query: ${getStr()}`))
		}
		res.render('index', app.locals.pageData["home"])
	})

	app.get(['/data','/data/index','/data/index.html'], (req,res) => {
		var date = new Date()
		var dateStr = `@ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
		console.log(access(`Access ${req.path} | `), info(dateStr))
		if (Object.keys(req.query).length !== 0) {
			var str = ""
			var getStr = function () {
				for (let prop in req.query) {
					str += `${prop} => ${req.query[prop]}, `
				}
				return str
			}
			console.log(info(`Query: ${getStr()}`))
		}
		res.render('data', {page: 'data/page.data.json'})
	})

	// Standard pages with standard aliases
	var pages = ['about','entry','log','analysis']

	for (let i in pages) {
		app.get([`/${pages[i]}`,`/${pages[i]}/`,`/${pages[i]}.html`], (req,res) => {
				var date = new Date()
				var dateStr = `@ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
				console.log(access(`Access ${req.path} | `), info(dateStr))
				if (Object.keys(req.query).length !== 0) {
					var str = ""
					var getStr = function () {
						for (let prop in req.query) {
							str += `${prop} => ${req.query[prop]}, `
						}
						return str
					}
					console.log(info(`Query: ${getStr()}`))
				}
			res.render(`${pages[i]}`, app.locals.pageData[pages[i]])
		})
	}

	app.get('/js/form_handler.js', (req,res) => {
		console.log(info(req))
	})
