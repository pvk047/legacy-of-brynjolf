import { getRoomData, printRoom, printRoomNotes } from './helpers/roomHelpers'
import { getMovementDirections } from './helpers/stdInputHelper'
import { 
	printDirectionStringNotes,
	executeMovesInAGivenRoom
} from './helpers/gameHelpers'

async function enlightenmentProblem() {
	console.clear()
	console.log('****Enlightenment Problem*****')

	const room = await getRoomData()
	printRoomNotes()
	printRoom(room)
	printDirectionStringNotes()

	let  movementDirections = await getMovementDirections()
	if(!movementDirections || !movementDirections.length) {
		console.log('Trying get shortest Path to Reach Exit')
		return
	}

	const { input , output } = executeMovesInAGivenRoom({ room, movementDirections })

	if (output.result.status === 'safe') {
		console.log('Trying get shortest Path to Reach Exit')
		return
	}
	
	console.log('--------------------Input----------------------------------')
	console.log('Directions: ', input.directions)
	printRoom(input.room)
	console.log('--------------------Result----------------------------------')
	printRoom(output.room)
	console.log()
	console.log('Result:',output.result.message)
	console.log()
	return 
	
}

export {
	enlightenmentProblem,
}