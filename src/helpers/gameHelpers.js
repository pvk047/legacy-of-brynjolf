import config from '../config'
function invokeGame() {
	console.log('Welcome to Legacy of BrynJolf')
	console.log('Please Enter : \n 1--> to Start Establishment Problem. \n 2 --> to Start Enlightenment Problem. \n 3 --> to Exit.')
}

function exitFromGame() {
	console.log('Bye.')
	// eslint-disable-next-line no-undef
	process.exit(0)
}

function printDirectionStringNotes() {
	console.log('\n Enter: \n\'u\' to move up.\n\'d\' to move down.\n\'l\' to move left.\n\'r\' to move right.')
	console.log('Example directions string: \'uud\' means move up, move up and move down from the current position of \'B\'')
}

function getPlayersAndGuards(room) {
	if(!room) {
		return { player: null, guards: null }
	}
	const  PLAYER_SYMBOL = config.room_config.symbols.player
	const  GUARD_SYMBOL = config.room_config.symbols.guards
	const player = {}
	const guards = []

	room.forEach((row, x) => {
		row.forEach((col, y) => {
			switch (col) {
			case PLAYER_SYMBOL:
				player.x = x
				player.y = y
				break
			case GUARD_SYMBOL:
				guards.push({ x, y })
				break
			}
		})
	})
	return { player, guards }
}

function isPlayerUnableMoveInGivenDirection({ player, room, newPosition, direction }) {
	if(newPosition.x >= config.room_config.size || newPosition.y >= config.room_config.size) {
		return true
	}
	const isWall =  room[newPosition.x][newPosition.y] === config.room_config.symbols.wall
	return isWall || isGivenPositionMetACornerByMovingInGivenDirection ({ direction , position: player }) 
}

function isGivenPositionMetACornerByMovingInGivenDirection ({ direction, position }) {
	if(position.y === 0 && direction === config.direction_symbols.left) {
		return true
	}

	if(position.y === config.room_config.size - 1 && direction === config.direction_symbols.right) {
		return true
	}

	if(position.x === config.room_config.size  - 1 && direction === config.direction_symbols.down) {
		return true
	}

	if(position.x === 0 && direction === config.direction_symbols.up) {
		return true
	}

	return false
}

function isPlayerCaughtByGuard({ room ,newPosition }) {
	return room[newPosition.x][newPosition.y] === config.room_config.symbols.guards
}
function isGuardCatchThePlayer ({ room ,newPosition }) {
	return room[newPosition.x][newPosition.y] === config.room_config.symbols.player
}
function isPlayerWon({ room ,newPosition }) {
	if(room[newPosition.x][newPosition.y] === config.room_config.symbols.exit) {
		return true
	}

	//  if(room[newPosition.x + 1][newPosition.y] === constants.exit) {
	//   return true
	//  }

	//  if(room[newPosition.x -1][newPosition.y] === constants.exit) {
	//   return true
	//  }

	//  if(room[newPosition.x][newPosition.y + 1] === constants.exit) {
	//   return true
	//  }

	//  if(room[newPosition.x][newPosition.y - 1] === constants.exit) {
	//   return true
	//  }

	return false
}

function getNewPosition({ currentPosition, direction }) {
	const directionConstants = config.direction_symbols_values
	const move = directionConstants[direction]

	const { coordinate, value, } = move

	const newPosition = {
		...currentPosition,
		[`${coordinate}`]: currentPosition[coordinate] + value,
	}

	if(newPosition.x >= config.room_config.size || newPosition.x < 0) {
		newPosition.x = currentPosition.x
	}

	if(newPosition.y >= config.room_config.size || newPosition.y < 0) {
		newPosition.y = currentPosition.y
	}

	return newPosition
}

function movePlayerAndGuards({ room, player, direction, guards }) {
 
	const newPosition = getNewPosition({ currentPosition: player, direction })

	if(isPlayerCaughtByGuard({ room, newPosition })) {
		return { stop: true, status: 'lose'}
	}

	if(isPlayerWon({room, newPosition })) {
		room[player.x][player.y] = config.room_config.symbols.empty_space
		return { stop: true, status: 'win'}
	}

	if(!isPlayerUnableMoveInGivenDirection({ player , room, newPosition, direction})) {
		moveIntoNewPosition ({ oldPosition: player, newPosition, room, symbol: config.room_config.symbols.player })
		updateOldPositionWithNewPosition(player, newPosition)
	}

  
	const { isGuardsUnableToMove, guardCatchPlayer }= moveGuardsAndGetStatus({ guards, room, direction  }) 

	if(guardCatchPlayer) {
		return { stop: true, status: 'lose'}
	} 
	// brnynjolf is unable to move and all the guards are unable move
	if(isGuardsUnableToMove) {
		return { stop: false, status: 'unable_to_move'}
	}
	return { stop: false, status: 'safe'}
}
function updateOldPositionWithNewPosition (oldPosition, newPosition) {
	oldPosition.x = newPosition.x
	oldPosition.y = newPosition.y
	return oldPosition
}

function moveIntoNewPosition ({ oldPosition, newPosition, room, symbol }) {
	room[newPosition.x][newPosition.y] =  symbol 
	room[oldPosition.x][oldPosition.y] = config.room_config.symbols.empty_space
	return room
	// printRoom(room)
}

function moveGuardsAndGetStatus({ guards, room, direction  }) {
	let guardCatchPlayer = false
	let guardsUnableToMoveCount = 0
	for(let i = 0; i < guards.length; i++) {
		const guard = guards[i]
		const newPosition = getNewPosition({ currentPosition: guard, direction })

		if(isPlayerUnableMoveInGivenDirection({ player: guard , room, newPosition, direction})) {
			guardsUnableToMoveCount += 1
			continue
		}
		if(isGuardCatchThePlayer({ room, newPosition })) {
			guardCatchPlayer = true
			break
		}
  
		moveIntoNewPosition ({ oldPosition: guard, newPosition, room, direction, symbol: config.room_config.symbols.guards })
		updateOldPositionWithNewPosition(guard, newPosition)
	}

	return {
		isGuardsUnableToMove: guardsUnableToMoveCount === guards.length,
		guardCatchPlayer, 
	}
}

function  isGameInUndecidedStatus({ directions, player, guards, room }) {
	// game is undecided if player and guards are unable move in directions.

	// clone(deep copy) this avoid copy by reference of primitives in Javascript.
	const playerCopy = JSON.parse(JSON.stringify(player)) 
	const guardsCopy = JSON.parse(JSON.stringify(guards))
	const roomCopy = JSON.parse(JSON.stringify(room))

	const movableEntities = [ playerCopy, ...guardsCopy ]

	let isGameIsUndecided = true

	for(let i = 0; i < directions.length; i++) {
		const direction = directions[i]
		const isAnyOneCanMove = movableEntities.some(movableEntity => {
			const newPosition = getNewPosition({ currentPosition: movableEntity, direction })

			const isEntityCanNotMove =  isPlayerUnableMoveInGivenDirection({
				player: movableEntity,
				room: roomCopy,
				newPosition,
				direction,
			})
  
			if(isEntityCanNotMove) {
				return false
			}

			moveIntoNewPosition({
				oldPosition: movableEntity,
				newPosition,
				room: roomCopy,
				symbol: direction
			})

			return true
		})
  
		if(isAnyOneCanMove) {
			isGameIsUndecided = false
			break
		}
	}

	return isGameIsUndecided
}

function executeMovesInAGivenRoom ({ room, movementDirections, }) {
	const initialRoom = JSON.parse(JSON.stringify(room))
	let result = {
		status: 'safe',
		message: parseResultString('safe')
	}
	const { player, guards } = getPlayersAndGuards(room)
	for(let i=0; i< movementDirections.length; i++) {
		const direction = movementDirections[i]
		const { stop = false, status } = movePlayerAndGuards({ room, player, direction, guards}) || {}

		if(stop) {
			result.status = status
			result.message = parseResultString(status, i+1, movementDirections.length)
			break
		}

		if(status == 'unable_to_move') {
			const remainingDirections = movementDirections.slice(i+1,)
			const isGameInUnDecided = isGameInUndecidedStatus({ directions: remainingDirections, player, guards, room })
			if(isGameInUnDecided) {
				result.status = 'undecided'
				result.message = parseResultString('undecided', i+ 1, movementDirections.length)
				break
			}
		}
	}
	return {
		input: {
			room: initialRoom,
			directions: movementDirections
		},
		output: {
			room,
			result,
		}
	}
}

function parseResultString(status, index, totalNumberOfDirections) {
	let str = `${status}`
	if(index < totalNumberOfDirections) {
		str += `:executed ${index} of ${totalNumberOfDirections}`
	}
	return str
}


export {
	invokeGame,
	exitFromGame,
	printDirectionStringNotes,
	getPlayersAndGuards,
	isPlayerUnableMoveInGivenDirection,
	isPlayerCaughtByGuard,
	isPlayerWon,
	getNewPosition,
	isGuardCatchThePlayer,
	movePlayerAndGuards,
	isGameInUndecidedStatus,
	executeMovesInAGivenRoom,
	updateOldPositionWithNewPosition,
	moveIntoNewPosition,
	moveGuardsAndGetStatus,
	parseResultString,
}