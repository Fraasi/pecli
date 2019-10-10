#!/usr/bin/env node
'use strict'
require('@babel/register');
const React = require('react')
const importJsx = require('import-jsx')
const {render} = require('ink')
const meow = require('meow')

const ui = importJsx('./ui')

const cli = meow(`
	Usage
	  $ pecli // package.json must be in the same folder

	Options
		--rainbow, -r  Include a rainbow

	Examples
	  $ pkg-cli --name=Jane
	  Hello, Jane
`)

render(React.createElement(ui, cli.flags))
