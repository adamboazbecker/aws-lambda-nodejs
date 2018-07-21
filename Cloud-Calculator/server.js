'use strict'

const AWS = require('aws-sdk')

module.exports = {
	runLambda () {

		// Let the argument be 3, for example
		const payload = {argument: 3}

		// instantiate lambda
		const lambda = new AWS.Lambda({
			accessKeyId: 'ENTER_YOUR_AWS_ACCESS_KEY',
			secretAccessKey: 'ENTER_YOUR_AWS_SECRET',
			region: 'ENTER_YOUR_REGION'
		})

		// define the parameters
		let params = {
			// FunctionName: 'ENTER_YOUR_FUNCTION_NAME',
			FunctionName: 'calculator-service-prod-calculatorFunction',
			InvocationType: 'RequestResponse',
			Payload: JSON.stringify(payload)
		}

		// call lambda and return a promise
		lambda.invoke(params, (err, data) => {
			if (err) {
				console.log(err)
				throw err
			}
			// extract the result
			const result = JSON.parse(data.payload).body
			console.log(result) // should be 9
		})
	}
}
