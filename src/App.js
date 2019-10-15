/* eslint-disable no-unused-vars */
'use strict'

import React, { useState } from 'react'
import child_process from 'child_process'
import { Text, Color, Box, Static, useInput, useApp } from 'ink'
import SelectInput from 'ink-select-input'
import packageJson from '../package.json'

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

	const isValidUrl = (string) => {
		try {
			const url = new URL(string)
			if (url.host) return true
			else return false
		} catch (_) {
			return false
		}
	}

	const handleSelect = ({ value }) => {
		if (prevKey === 'scripts') {
			exit()
			child_process.execSync(`npm run ${value}`, {
				stdio: 'inherit',
			})
		}
		if (isValidUrl(currentObj[value])) {
			exit()
			child_process.execSync(`start ${currentObj[value]}`, {
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
							package.json explorer cli
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
