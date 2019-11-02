#!/usr/bin/env node
'use strict'

if (process.env.NODE_ENV === 'development') {
	require('@babel/register')
}
const React = require('react')
const importJsx = require('import-jsx')
const {render} = require('ink')
const meow = require('meow')

const cli = meow(`
	Usage
		$ pecli

	How to
		Use arrow keys to navigate
		Press enter to open an url or run a script
		Esc or ctrl + c to exit program

	Note
		Package.json must be in the folder
		the command is run, otherwise
		throws a hissy fit

	Options
		--help, -h Show this help
		--version, -v Print out version number
`, {
	flags: {
		help: {
			alias: 'h'
		},
		version: {
			alias: 'v'
		}
	}
})

const App = importJsx('./App.js')
render(React.createElement(App, cli.flags))
