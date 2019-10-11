/* eslint-disable no-unused-vars */
// 'use strict'

import React, { useState } from 'react'
import child_process from 'child_process'
import { Text, Color, Box, Static, useInput, useApp } from 'ink'
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
	const [stack, setStack] = useState([])
	const { exit } = useApp()

	useInput((input, key) => {
		if (key.escape) exit()
		if (key.rightArrow) {
			if (currentObj[currentKey] && (currentObj[currentKey] instanceof Object)) {
				setStack([...stack, currentKey])
				setPrevKey(currentKey)
				setCurrentKey(Object.keys(currentObj[currentKey])[0])
				setCurrentObj(currentObj[currentKey])
				return
			}
		}
		if (key.leftArrow) {
			if (stack.length > 1) {
				stack.pop()
				const newCurObj = stack.reduce((obj, key) => {
					return obj[key]
				}, packageJson)				
				setStack([...stack])
				setCurrentObj(newCurObj)
			}
			else {
				setStack([])
				setCurrentObj(packageJson)
			}
		}
		return
	})

	const handleSelect = ({ value }) => {
		console.log('values p c:', prevKey, currentKey, stack)
		if (prevKey === 'scripts') {
			child_process.execSync(`npm run ${value}`, {
				stdio: 'inherit',
			})

			// process.exit(0)
			exit()
			// return
		}
		if (isValidUrl(currentObj[value])) {
			child_process.exec(`start ${currentObj[value]}`, {
				stdio: 'inherit',
			})
		}
	}

	return (
		<React.Fragment>
			<Static>
				<Box marginLeft={7} marginTop={1} height={3}>
					<Color magenta>
						<Text bold underline>
							Package.json explorer cli
						</Text>
					</Color>
				</Box>
			</Static>

			<Box marginTop={0} flexDirection="column">
				<SelectInput
					items={Object.keys(currentObj).map(key => {
						return {
							label: `${key.padEnd(30, '.')}${currentObj[key]}`,
							value: key,
						}
					})}
					// initialIndex={stack.length}
					onSelect={handleSelect}
					onHighlight={(key) => { setCurrentKey(key.value) }}
					indicatorComponent={({ isSelected }) => (
						<Color yellow={isSelected}>
							{isSelected ? ` > ` : '   '}
						</Color>
					)}
					itemComponent={({ isSelected, label }) => (
						<Color yellow={isSelected}>
							{label}
						</Color>
					)}
				/>
			</Box>
		</React.Fragment>
	)
}


module.exports = App
