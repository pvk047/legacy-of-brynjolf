import readLine from 'readline'

const getInput = () =>  new Promise((resolve) => {
	const readline = readLine.createInterface({
		// eslint-disable-next-line no-undef
		input: process.stdin,
		// eslint-disable-next-line no-undef
		output: process.stdout,
	})
	readline.on('line',(line)=>{
		readline.close()
		resolve(line)
	})
})

async function getMovementDirections() {
	console.log('Please Enter Movement Directions: ')
	let movementDirections = await getInput()
	if(!movementDirections || !movementDirections.length) {
		return await getMovementDirections()
	}


	movementDirections = (movementDirections || '').split('')
	if(isInvalidMovementDirections(movementDirections)) {
		console.log('Invalid Movement Directions')
		return await getMovementDirections()
	} 
	return movementDirections 
}
function isInvalidMovementDirections (movementDirections = []) {
	const allowedChars = {
		l: true,
		r: true,
		d: true,
		u: true,
	}
	return movementDirections.some(char => !allowedChars[char])
}

export {
	getInput,
	getMovementDirections
}
