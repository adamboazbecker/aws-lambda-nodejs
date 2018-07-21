module.exports = {
	async squareTheArgumentMethod (event, context, callback) {

		// extract the argument
		let argument = event.argument

		// turn string argument into number
		argument = Number(argument)

		// square the argument
		const answer = argument * argument

		// return the argument with a callback function
		callback(null, {
			statusCode: '200',
			body: answer,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*' // Required for CORS support to work
			}
		})
	}
}
