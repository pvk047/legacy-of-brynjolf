let config =  {
	room_config: {
		size: 4,
		symbols: {
			guards: 'G',
			wall: 'X',
			empty_space: '.',
			exit: 'E',
			player: 'B'
		}
	},
	direction_symbols: {
		left: 'l',
		right: 'r',
		up: 'u',
		down: 'd',
	},
	direction_symbols_values: {

	}
}
config.direction_symbols_values = {
	[`${config.direction_symbols.left}`] : { coordinate: 'y', value: -1, direction: config.direction_symbols.left},
	[`${config.direction_symbols.right}`] : { coordinate: 'y', value: +1, direction: config.direction_symbols.right},
	[`${config.direction_symbols.up}`] : { coordinate: 'x', value: -1, direction: config.direction_symbols.up},
	[`${config.direction_symbols.down}`] : { coordinate: 'x', value: +1, direction: config.direction_symbols.down},
}

export default config