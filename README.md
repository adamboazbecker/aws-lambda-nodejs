# aws-lambda-nodejs
How to set up a cloud calculator on AWS using lambda.

Extra reference can be found on the lambda docs (https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) and on The Serverless Framework docs (https://serverless.com/framework/docs/). Pluralsight also has excellent courses on the topic.

##### Create an AWS account
Go to AWS -> Users -> Add User -> Get access key ID & secret key

##### Download node
Visit https://nodejs.org/en/download/

##### Install The Serverless Framework using npm (Node Package Manager)
`npm install serverless -g`

##### Enter your AWS credentials using the AWS-CLI
`pip3 install awscli --upgrade --user`
Enter the credentials to the AWS by entering
`aws config`

##### Create a Serverless Framework service from a template - we will call it Cloud-Calculator
`serverless create --template aws-nodejs --path Cloud-Calculator`

This last command creates a directory called **Cloud-Calculator** that contains 2 files: `handler.js` and `serverless.yml`.

Let's update the configuration on `serverless.yml` first.

```
# serverless.yml

# Update the provider section with your region and runtime information:
service: calculator-service

provider:
  name: aws
  runtime: nodejs8.10
  stage: prod
  region: us-west-2

# Update the functions section with your specific calling method and function names:
functions:
  calculatorFunction:
    handler: handler.squareTheArgumentMethod
```

Now update the `handler.js` function.

```
// handler.js

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

```

##### Deploy the service
`serverless deploy`

##### Record the function name
The previous command will return the following:
```
-----------------------------------
-----------------------------------
Service Information
service: calculator-service
stage: prod
region: us-west-2
stack: calculator-service-prod
api keys:
  None
endpoints:
  None
functions:
  calculatorFunction: calculator-service-prod-calculatorFunction // This is the function name
```

#### Call the lambda function from a server.js
First, install the `aws-sdk` library in node.
`npm install aws-sdk`

Create a file called `server.js` and write into it the command to invoke our lambda function.



```
// server.js

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
```


