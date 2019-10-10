/* eslint-disable no-unused-vars */
// 'use strict'

import React, { useState } from 'react'
import child_process from 'child_process'
import { Text, Color, Box, Static, useInput, useApp } from 'ink'
import SelectInput from 'ink-select-input'
import packageJson from './package.json'

const getKeyList = (obj) => {
	const listItems = Object.keys(obj).map(key => {
		return {
			label: `${key.padEnd(25, '.')}${obj[key]}`,
			value: key,
		}
	})
	return listItems
}


const App = () => {

	const [keyList, setKeyList] = useState(getKeyList(packageJson))
	const [currentKey, setCurrentKey] = useState(keyList[0].value)
	const { exit } = useApp()

	useInput((input, key) => {
		if (key.escape) exit()

		if (key.rightArrow) {
			if (currentKey && packageJson[currentKey] instanceof Object) {
				setKeyList(getKeyList(packageJson[currentKey]))
				return
			}
		}
		if (key.leftArrow) {
			getKeyList(packageJson)
		}

	})

	const handleSelect = ({ value }) => {
		// console.log('value:', value)
		// console.log('cyrrkey', currentKey)

		// if (value && packageJson[value] instanceof Object) {
		// 	setList(getListItems(packageJson[value]))
		// 	return
		// }
		// console.log('nou handle, exit')
		// setList(getListItems(packageJson))
		// child_process.execSync(`npm run ${value}`, {
		// 	stdio: 'inherit',
		// })
		// if (??) exit()
	}

	return (
		<React.Fragment>
			<Static> */}
				<Box marginLeft={1} width={4} height={2}>
					<Color blue>
						<Text bold>
							Package.json explorer cli
						</Text>
					</Color>
				</Box>
			</Static>

			<Box marginTop={0} flexDirection="column">
				{/* <Static> */}

				<SelectInput
					items={keyList}
					onSelect={(value) => { handleSelect(value) }}
					onHighlight={(key) => { setCurrentKey(key.value) }}
				/>

				{/* </Static> */}
			</Box>
		</React.Fragment>
	)
}


module.exports = App
