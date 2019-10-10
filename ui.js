/* eslint-disable no-unused-vars */
// 'use strict'

import React, { useState } from 'react'
import child_process from 'child_process'
import { Text, Color, Box, Static, useInput, useApp, AppContext } from 'ink'
import SelectInput from 'ink-select-input'
import packageJson from './package.json'

const isValidUrl = (string) => {
	try {
		const url = new URL(string)
		if (url.host) return true
		else return false
	} catch (_) {
		return false
	}
}

const App = () => {

	const [currentObj, setCurrentObj] = useState(packageJson)
	const [currentKey, setCurrentKey] = useState(Object.keys(currentObj)[0])
	const [prevKey, setPrevKey] = useState(currentKey)
	const { exit } = useApp()
	let exitFlag = false // prevents last render

	useInput((input, key) => {
		if (key.escape) exit()
		if (key.rightArrow) {
			if (currentObj[currentKey] && (currentObj[currentKey] instanceof Object)) {
				setPrevKey(currentKey)
				setCurrentObj(currentObj[currentKey])
				setCurrentKey(Object.keys(currentObj)[0])
				return
			}
		}
		if (key.leftArrow) {
			setCurrentObj(packageJson)
		}
	})

	const handleSelect = ({ value }) => {
		console.log('values p c:', prevKey, currentKey)
		if (prevKey === 'scripts') {
			child_process.execSync(`npm run ${value}`, {
				stdio: 'inherit',
			})
			exitFlag = true
			process.exit(0)
			// exit()
			// return
		}
		if (isValidUrl(currentObj[value])) {
			child_process.exec(`start ${currentObj[value]}`, {
				stdio: 'inherit',
			})
		}
	}

	if (exitFlag) return null
	return (
		<React.Fragment>
			<Static>
				<Box marginLeft={5} marginTop={1} height={3}>
					<Color red>
						<Text bold>
							Package.json explorer cli
						</Text>
					</Color>
				</Box>
			</Static>

			<Box marginTop={0} flexDirection="column">
				{/* <Color rgb={[0,70,0]}> */}
					<SelectInput
						items={Object.keys(currentObj).map(key => {
							return {
								label: `${key.padEnd(25, '.')}${currentObj[key]}`,
								value: key,
							}
						})}
						onSelect={handleSelect}
						onHighlight={(key) => { setCurrentKey(key.value) }}
						indicatorComponent={({isSelected}) => (
							<Color yellow={isSelected}>
								{isSelected ? ` > ` : '   '}
							</Color>
						)}
						itemComponent={({isSelected, label}) => (
							<Color yellow={isSelected}>
								{label}
							</Color>
						)}
						/>
				{/* </Color> */}
			</Box>

		</React.Fragment>
	)
}


module.exports = App
