import { getRoomData, printRoom, printRoomNotes } from './helpers/roomHelpers'
import { getMovementDirections } from './helpers/stdInputHelper'
import { 
	printDirectionStringNotes,
	executeMovesInAGivenRoom
} from './helpers/gameHelpers'

async function establishProblem() {
	console.clear()
	console.log('****Establish Problem*****')

	const room = await getRoomData()
	printRoomNotes()
	printRoom(room)
	printDirectionStringNotes()

	let  movementDirections = await getMovementDirections()

	const { input , output } = executeMovesInAGivenRoom({ room, movementDirections })

	console.log('--------------------Input----------------------------------')
	console.log('Directions: ', input.directions)
	printRoom(input.room)
	console.log('--------------------Result----------------------------------')
	printRoom(output.room)
	console.log()
	console.log('Result:',output.result.message)
	console.log()
}

export {
	establishProblem,
}