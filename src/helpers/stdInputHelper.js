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
	if(!movementDirections || !movementDirections.length ) {
		await getInput()
		return
	}

	movementDirections = (movementDirections || '').split('')
	return movementDirections
}

export {
	getInput,
	getMovementDirections
}
