/* eslint-disable no-undef */
import { findShortestPath } from '../../src/enlightenmentProblem'

describe('findAndPrintShortestPath', () => {
	it('should return found as true,winning path', () => {
		const room = [
			['.','.','.','X'],
			['.','G','.','X'],
			['.','B','.','E'],
			['.','.','G','.']
		]
		const result = findShortestPath(room)
		expect(result.found).toBeTruthy()
		expect(result.point.path).toBe('rr')
	})
  
	it('should return found as false', () => {
		const room = [
			['.','.','.','X'],
			['.','.','.','X'],
			['G','.','.','E'],
			['B','G','.','.']
		]
		const result = findShortestPath(room)
		expect(result.found).toBeFalsy()
	})
})