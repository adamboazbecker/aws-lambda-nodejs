# aws-lambda-nodejs
How to set up a cloud calculator on AWS using lambda

##### Create an AWS account
Go to AWS -> Users -> Add User -> Get access key ID & secret key

##### Download node (or python)
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
    const argument = event.argument

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



