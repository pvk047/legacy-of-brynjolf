import fs from 'fs'
import util from 'util'

function printRoom(roomData = []) {
	roomData.forEach(row => {
		console.log(' ___ ___ ___ ___')
		console.log('| ' + row.join(' | ') +  ' |')
	})
	console.log(' ___ ___ ___ ___')
}

async function getRoomData(fileName = 'room.txt') {
	let data = await readFile(fileName)
	data = JSON.parse(data)
	return data
}

function printRoomNotes() {
	console.log('Note: \n \'.\' means Empty.\'G\' means Guard.\'X\' means Wall.\'B\' means Brynjolf.\'E\' means Exit.')
}



const readFile = util.promisify(fs.readFile)

export {
	printRoom,
	getRoomData,
	readFile,
	printRoomNotes,
}
