import { invokeGame, exitFromGame } from './helpers/gameHelpers'
import { getInput } from './helpers/stdInputHelper'
import { establishProblem } from './establishProblem'
import { enlightenmentProblem } from './enlightenmentProblem'

;(async function () {
	invokeGame()
	await input()
}) ()

async function input () {
	const option = await getInput()
	await userInputHandler(option)
}

async function userInputHandler(option) {
	option = Number(option)
	switch(option) {
	case 1: 
		await establishProblem()
		break
	case 2: 
		await enlightenmentProblem()
		break
	case 3: 
		exitFromGame()
		break
	default:
		console.log('Invalid option')
		invokeGame()
		await input()
		break
	}
}