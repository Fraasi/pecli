#!/usr/bin/env node
'use strict'
const path = require('path')
const { version } = require('../package.json')
try {
	require(path.join(process.cwd(), 'package.json'))
} catch(err) {
	console.error('Error:', err.message)
	process.exit(1)
}
if (process.env.NODE_ENV !== 'production') {
	require('@babel/register')
}
const React = require('react')
const importJsx = require('import-jsx')
const {render} = require('ink')
const meow = require('meow')

const App = importJsx('./App.js')

const cli = meow(`
	v${version}

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
		--help, Show this help
`)

render(React.createElement(App, cli.flags))
