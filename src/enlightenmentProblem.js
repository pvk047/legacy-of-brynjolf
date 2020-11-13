import { getRoomData, printRoom, printRoomNotes } from './helpers/roomHelpers'
import { getMovementDirections, getMovementDirectionsForEnlightenment } from './helpers/stdInputHelper'
import { 
	printDirectionStringNotes,
	executeMovesInAGivenRoom,
	moveGuardsAndGetStatus,
	movePlayerAndGuards,
	getPlayersAndGuards
} from './helpers/gameHelpers'
import config from './config'

async function enlightenmentProblem() {
	console.clear()
	console.log('****Enlightenment Problem*****')

	const room = await getRoomData()
	printRoomNotes()
	printRoom(room)
	printDirectionStringNotes()

	let  movementDirections = await getMovementDirectionsForEnlightenment()

	if(!movementDirections || !movementDirections.length) {
		return findAndPrintShortestPath (room)
	}

	const { input , output } = executeMovesInAGivenRoom({ room, movementDirections })

	if (output.result.status === 'safe') {
		return findAndPrintShortestPath (room)
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

function findAndPrintShortestPath (room) {
	const result = findShortestPath (room)
	if(result.found) {
		console.log('winning path:',result.point.path)
		return result
	} else {
		console.log('stuck: no way to win')
		return result
	}
}

function findShortestPath (room) {
	const { player, guards, exit } = getPlayersAndGuards(room)
	const result = BFS({room, source: player, dest: exit, guards})
	return result
}
const visited = Array(4).fill('').map(el => Array(4).fill(false))
const dequeue = []
function BFS ({ source, dest, room }) {
	const moves = [
		{
			x: 0,
			y: 1,
			symbol: 'r',
		},
		{
			x: 0,
			y: -1,
			symbol: 'l',
		},
		{
			x: -1,
			y: 0,
			symbol: 'u',
		},
		{
			x: 1,
			y: 0,
			symbol: 'd',
		},
	]

	if (!isValidPoint({ point: source, room }) || !isValidPoint({ point: dest,room })) {
		return {found: false}
	}	
	visited[source.x][source.y] = true
	source.distance = 0
	source.path = ''

	dequeue.unshift(source)

	while(dequeue.length) {
		const point = dequeue.pop()
		point.distance = point.distance || 0
		if(isValidPoint ({ point, room })  && isDestination({room, point})) {
			return { found: true, point}
		}

		for(let i = 0; i< moves.length; i++) {
			const move = moves[i]
			const x = point.x + move.x
			const y = point.y + move.y

			if(isValidPoint({ point: {x,y}, room }) && !visited[x][y]) {
				visited[x][y] = true
				const path = `${point.path}${move.symbol}`
				const newPoint = {
					x,y,
					distance: point.distance + 1,
					path,
				}
				dequeue.unshift(newPoint)
			}
		}
	}

	return { found: false}
}

function isValidPoint ({ point, room }) {
	const movable = {
		[`${config.room_config.symbols.empty_space}`]: true,
		[`${config.room_config.symbols.player}`]: true,
		[`${config.room_config.symbols.exit}`]: true,
	}

	return  isNotACorner(point) &&  movable[room[point.x][point.y]]
}

function isNotACorner (point) {
	return (point.x < config.room_config.size && point.x >= 0) && (point.y >=  0 && point.y < config.room_config.size)
}


function isDestination({ point, room }) {
	return point.x < config.room_config.size && point.y < config.room_config.size && room[point.x][point.y] === config.room_config.symbols.exit
}
export {
	enlightenmentProblem,
	findAndPrintShortestPath,
	findShortestPath,
}