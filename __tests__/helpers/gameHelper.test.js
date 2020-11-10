/* eslint-disable no-undef */
import { 
	getPlayersAndGuards,
	isPlayerUnableMoveInGivenDirection,
	getNewPosition,
	isPlayerCaughtByGuard,
	isGuardCatchThePlayer,
	isPlayerWon,
	movePlayerAndGuards,
	updateOldPositionWithNewPosition,
	moveIntoNewPosition,
	moveGuardsAndGetStatus,
	isGameInUndecidedStatus,
	executeMovesInAGivenRoom,
	parseResultString,
} from '../../src/helpers/gameHelpers'
describe('getPlayersAndGuards', () => {
	it('should return player as null if room in not Provided', () => {
		const result = getPlayersAndGuards()
		expect(result.player).toBeNull()
	})
	it('should return Guards as null if room in not Provided', () => {
		const result = getPlayersAndGuards()
		expect(result.guards).toBeNull()
	})
  
	it('should return Player coordinates if room has player', () => {
		const room = [['.','.','.','X'],['.','G','.','X'],['.','B','.','E'],['.','.','G','.']]
		const result = getPlayersAndGuards(room)
		expect(result.player).toEqual({x: 2, y: 1})
	})
	it('should return Player as {} if room has No Player', () => {
		const room = [['.','.','.','X'],['.','G','.','X'],['.','.','.','E'],['.','.','G','.']]
		const result = getPlayersAndGuards(room)
		expect(result.player).toEqual({})
	})

	it('should return Guards as [] if room has No Guards', () => {
		const room = [['.','.','.','X'],['.','.','.','X'],['.','B','.','E'],['.','.','.','.']]
		const result = getPlayersAndGuards(room)
		expect(result.guards).toEqual([])
	})
})

describe('isPlayerUnableMoveInGivenDirection', () => {
	it('return true if there is wall in given direction', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['X','B','.','E'],['.','.','G','.']]
   
		const direction = 'l'
		const { player } = getPlayersAndGuards(room)
		const newPosition = getNewPosition({ currentPosition: player, direction })

		const result = isPlayerUnableMoveInGivenDirection({
			player,
			room,
			newPosition,
			direction
		})
		expect(result).toBeTruthy()
	})

	it('return true if player at corner and wanna move corner direction', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['B','.','.','E'],['.','.','G','.']]

		const direction = 'l'
		const { player } = getPlayersAndGuards(room)
		const newPosition = getNewPosition({ currentPosition: player, direction })

		const result = isPlayerUnableMoveInGivenDirection({
			player,
			room,
			newPosition,
			direction
		})
		expect(result).toBeTruthy()
	})
  
	it('return false if there is wall in given direction', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['.','B','.','E'],['.','.','G','.']]
  
		const direction = 'l'
		const { player } = getPlayersAndGuards(room)
		const newPosition = getNewPosition({ currentPosition: player, direction })

		const result = isPlayerUnableMoveInGivenDirection({
			player,
			room,
			newPosition,
			direction
		})
		expect(result).toBeFalsy()
	})
})
describe('isPlayerCaughtByGuard', () => {
	it('return true if new Position has Guard', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['.','B','.','E'],['.','.','G','.']]
		const direction = 'u'
		const { player } = getPlayersAndGuards(room)
		const newPosition = getNewPosition({ currentPosition: player, direction })

		const result = isPlayerCaughtByGuard({
			player,
			room,
			newPosition,
			direction
		})
		expect(result).toBeTruthy()
	})
  
	it('return false if new Position has No Guard', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['.','B','.','E'],['.','.','G','.']]
		const direction = 'r'
		const { player } = getPlayersAndGuards(room)
		const newPosition = getNewPosition({ currentPosition: player, direction })

		const result = isPlayerCaughtByGuard({
			room,
			newPosition
		})
		expect(result).toBeFalsy()
	})

})

describe('isGuardCatchThePlayer', () => {
	it('return true if Guard moves and caught Player', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['.','B','.','E'],['.','.','G','.']]
		const direction = 'd'
		const { guards } = getPlayersAndGuards(room)
		const newPosition = getNewPosition({ currentPosition: guards[0], direction })

		const result = isGuardCatchThePlayer({
			room,
			newPosition,
		})
		expect(result).toBeTruthy()
	})
	it('return false if Guard moves and not caught Player', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['.','B','.','E'],['.','.','G','.']]
		const direction = 'r'
		const { guards } = getPlayersAndGuards(room)
		const newPosition = getNewPosition({ currentPosition: guards[0], direction })

		const result = isGuardCatchThePlayer({
			room,
			newPosition,
		})
		expect(result).toBeFalsy()
	})

})

describe('isPlayerWon', () => {
	it('return false if Player not reached the Exit', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['.','B','.','E'],['.','.','G','.']]
		const direction = 'r'
		const { player } = getPlayersAndGuards(room)
		const newPosition = getNewPosition({ currentPosition: player, direction })

		const result = isPlayerWon({ room, newPosition})
		expect(result).toBeFalsy()
	})
	it('return true if Player reached the Exit', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['.','.','B','E'],['.','.','G','.']]
		const direction = 'r'
		const { player } = getPlayersAndGuards(room)
		const newPosition = getNewPosition({ currentPosition: player, direction })

		const result = isPlayerWon({ room, newPosition})
		expect(result).toBeTruthy()
	})

})

describe('getNewPosition', () => {
	it('should return same object if exceeds room size', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['B','.','.','E'],['.','.','G','.']]
		const direction = 'l'
		const { player } = getPlayersAndGuards(room) 
		const result = getNewPosition({currentPosition: player, direction })
		expect(result).toEqual(player)
	})
	it('should return new Coordinates object in Given Direction', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['.','B','.','E'],['.','.','G','.']]
		const direction = 'l'
		const { player } = getPlayersAndGuards(room) 
		const result = getNewPosition({currentPosition: player, direction })
		expect(result).toEqual({
			x: 2,
			y: 0
		})
	})
})

describe('movePlayerAndGuards', () => {
	it('should return stop=false and status=safe is Player and Guards made a safe move', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['.','B','.','E'],['.','.','G','.']]
		const direction = 'l'
		const { player, guards } = getPlayersAndGuards(room) 
		const result = movePlayerAndGuards({
			room,
			guards,
			player,
			direction,
		})
		expect(result).toEqual({ status: 'safe', stop: false})
	})
  
	it('should return stop=false and status=unable_to_move is Player and Guards are unable to move', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['B','.','.','E'],['G','.','.','.']]
		const direction = 'l'
		const { player, guards } = getPlayersAndGuards(room) 
		const result = movePlayerAndGuards({
			room,
			guards,
			player,
			direction,
		})
		expect(result).toEqual({ status: 'unable_to_move', stop: false})
	})
	it('should return stop=true and status=lose is Player was Caught(lose)', () => {
		const room = [['.','.','.','X'],['X','.','G','.'],['.','B','.','E'],['.','G','.','.']]
		const direction = 'd'
		const { player, guards } = getPlayersAndGuards(room) 
		const result = movePlayerAndGuards({
			room,
			guards,
			player,
			direction,
		})
		expect(result).toEqual({ status: 'lose', stop: true})
	})
	it('should return stop=true and status=win is Player entered to Exit', () => {
		const room = [['.','.','.','X'],['X','.','G','.'],['.','.','B','E'],['.','G','.','.']]
		const direction = 'r'
		const { player, guards } = getPlayersAndGuards(room) 
		const result = movePlayerAndGuards({
			room,
			guards,
			player,
			direction,
		})
		expect(result).toEqual({ status: 'win', stop: true})
	})
})

describe('updateOldPositionWithNewPosition', () => {
	it('should return object with updated Coordinated Values of New Position', () => {
		const oldPosition = {
			x: 1,
			y: 1
		}
		const newPosition = {
			x: 1,
			y: 2
		}
		const result = updateOldPositionWithNewPosition(oldPosition,newPosition)
		expect(result.x).toBe(newPosition.x)
		expect(result.y).toBe(newPosition.y)
	})
})

describe('moveIntoNewPosition', ()=> {
	it('should Update With Current Position with Empty Space and update new Position with Given Symbol', ()=> {
    const room = [['.','.','.','X'],['X','.','G','.'],['.','.','B','E'],['.','G','.','.']]
    const direction = 'l'
    const symbol = 'B'
    const { player } = getPlayersAndGuards(room)
    const newPosition = getNewPosition({ currentPosition: player, direction })
    const result = 	moveIntoNewPosition ({ oldPosition: player, newPosition, room, symbol })
  
    expect(result[2][2]).toBe('.')
    expect(result[2][1]).toBe('B')
	})
})

describe('moveGuardsAndGetStatus', () => {
  it('should return isGuardsUnableToMove true if all guards are unable to Move', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['.','.','B','E'],['G','.','.','.']]
		const direction = 'l'
		const { guards  } = getPlayersAndGuards(room)
		const result = moveGuardsAndGetStatus({ room, guards, direction})
		expect(result.isGuardsUnableToMove).toBeTruthy()
	})
  it('should return isGuardsUnableToMove false if any guard can move', () => {
		const room = [['.','.','.','X'],['X','.','G','.'],['.','.','B','E'],['G','.','.','.']]
		const direction = 'l'
		const { guards  } = getPlayersAndGuards(room)
		const result = moveGuardsAndGetStatus({ room, guards, direction})
		expect(result.isGuardsUnableToMove).toBeFalsy()
	})

  it('should return guardCatchPlayer false if any guard did not catch player', () => {
		const room = [['.','.','.','X'],['X','.','G','.'],['.','.','B','E'],['G','.','.','.']]
		const direction = 'l'
		const { guards  } = getPlayersAndGuards(room)
		const result = moveGuardsAndGetStatus({ room, guards, direction})
		expect(result.guardCatchPlayer).toBeFalsy()
	})

	it('should return guardCatchPlayer true if any guard catch player', () => {
		const room = [['.','.','.','X'],['X','.','.','.'],['.','.','G','E'],['G','.','B','.']]
		const direction = 'd'
		const { guards  } = getPlayersAndGuards(room)
		const result = moveGuardsAndGetStatus({ room, guards, direction})
		expect(result.guardCatchPlayer).toBeTruthy()
	})
})

describe('isGameInUndecidedStatus', () => {
	it('should return true if player and guards are unable to move in given directions', () => {
		const room = [['.','.','.','X'],['X','G','','.'],['B','.','.','E'],['G','.','.','.']]
		const directions = 'llllll'
		const { player, guards } = getPlayersAndGuards(room)
		const result = isGameInUndecidedStatus({ directions, player, guards, room })
		expect(result).toBeTruthy()
	})
	it('should return false if player and guards are able to move in given directions', () => {
		const room = [['.','.','.','X'],['X','G','.','.'],['.','B','.','E'],['G','.','.','.']]
		const directions = 'l'
		const { player, guards } = getPlayersAndGuards(room)
		const result = isGameInUndecidedStatus({ directions, player, guards, room })
		expect(result).toBeFalsy()
	})
})

describe('executeMovesInAGivenRoom', () => {
	executeMovesInAGivenRoom
	it('should return output status as safe', () => {
		const room = [['.','.','.','X'],['.','G','.','X'],['.','B','.','E'],['.','.','G','.']]
		const movementDirections = 'lrlrr'
		const { output: {result: { status } = {}} = {} } = executeMovesInAGivenRoom({ room, movementDirections})
		expect(status).toBe('safe')
	})
	it('should return output status as win', () => {
		const room = [['.','.','.','X'],['.','G','.','X'],['.','B','.','E'],['.','.','G','.']]
		const movementDirections = 'rrrrr'
		const { output: {result: { status } = {}} = {} } = executeMovesInAGivenRoom({ room, movementDirections})
		expect(status).toBe('win')
	})

	it('should return output status as lose', () => {
		const room = [['.','.','.','X'],['.','G','.','X'],['.','B','.','E'],['.','.','G','.']]
		const movementDirections = 'dlur'
		const { output: {result: { status } = {}} = {} } = executeMovesInAGivenRoom({ room, movementDirections})
		expect(status).toBe('lose')
	})
})
describe('parseResultString', () => {
	it('should return string containing given status and executed moves and total no of moves', () => {
		const result = parseResultString('win',3,5)
		expect(result).toBe('win:executed 3 of 5')
	})
	it('should return string containing given only status if index == totalNumberOfMoves(executed all moves)', () => {
		const result = parseResultString('win',5,5)
		expect(result).toBe('win')
	})
})