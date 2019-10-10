/* eslint-disable no-unused-vars */
// 'use strict'

import React, { useState } from 'react'
import child_process from 'child_process'
import { Text, Color, Box, Static, useInput, useApp } from 'ink'
import SelectInput from 'ink-select-input'
import packageJson from './package.json'


const App = () => {

	const [currentObj, setCurrentObj] = useState(packageJson)
	const [currentKey, setCurrentKey] = useState(Object.keys(currentObj)[0])
	const [prevKey, setPrevKey] = useState(currentKey)
	const { exit } = useApp()

	useInput((input, key) => {
		if (key.escape) exit()
		if (key.rightArrow) {
			if (currentObj[currentKey] && (currentObj[currentKey] instanceof Object)) {
				setPrevKey(currentKey)
				setCurrentObj(currentObj[currentKey])
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
			child_process.exec(`npm run ${value}`, {
				stdio: 'inherit',
			})
			exit()
		}

	}

	return (
		<React.Fragment>
			<Static>
				<Box marginLeft={3} width={4} height={2}>
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
					items={Object.keys(currentObj).map(key => {
						return {
							label: `${key.padEnd(25, '.')}${currentObj[key]}`,
							value: key,
						}
					})}
					onSelect={(value) => { handleSelect(value) }}
					onHighlight={(key) => { setCurrentKey(key.value) }}
				/>

				{/* </Static> */}
			</Box>
		</React.Fragment>
	)
}


module.exports = App
