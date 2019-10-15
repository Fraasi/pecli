#!/usr/bin/env node
'use strict'
try {
	require('../package.json')
} catch(err) {
	console.error('Error:', err.message)
	process.exit(1)
}
// require('@babel/register')
const React = require('react')
const importJsx = require('import-jsx')
const {render} = require('ink')
const meow = require('meow')

const App = importJsx('./App.js')

const cli = meow(`
	Usage
		$ pecli

	How to
		Use arrow keys to navigate
		Press enter to open an url or run a script
		Esc or ctrl + c to exit program

	Options
		--help, Show this help

	Note
		Package.json must be in the folder
		the command is run, otherwise
		throws an error
`)

render(React.createElement(App, cli.flags))