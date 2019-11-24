# Twilio

## Setup your Twilio account

### Get your account credentials

Get your **Account SID** and **Auth Token** from your [Twilio dashboard](https://www.twilio.com/console) to create your channel.
![Get Credentials](https://cdn.recast.ai/man/recast-ai-twillio-4.png)

### Get a phone number

Go on the [*Phone Numbers*](https://www.twilio.com/console/phone-numbers/incoming) section of the console. Create a phone number if you don\'t already have one by clicking on the **+** sign.
![Setup Phone Number](https://cdn.recast.ai/man/recast-ai-twillio-3.png)
Get your **phone number**, you will need it to create your channel.

### Create your messaging service

Go on the [*Programmable SMS* > *Messaging Services*](https://www.twilio.com/console/sms/services) section of the console, and create a new messaging service by clicking on the **+** sign.
Name it and choose the **Chat Bot/Interactive 2-Way** use case
![Create Messaging Service](https://cdn.recast.ai/man/recast-ai-twillio-1.png)
Once done, pick the **Service SID**, you will need it later to create your channel.

### Setup your phone number

Go back on the [*Phone Numbers*](https://www.twilio.com/console/phone-numbers/incoming) section and select your bot phone number.
![Setup Phone Number](https://cdn.recast.ai/man/recast-ai-twillio-3.png)
In the **Messaging** configuration section, set the **Configure with** block to **Messaging Service** and fill the **Messaging Service** block with the name of the service you\'ve created in the previous step.
![Setup Phone Number](https://cdn.recast.ai/man/recast-ai-twillio-2.png)

## Start Connector in local

* Clone and install Connector
```bash
$ git clone https://github.com/RecastAI/bot-connector.git
$ cd bot-connector
$ yarn install
$ yarn start-dev
```

* Create your connector
```bash
$ curl -X POST "http://localhost:8080/connectors/" --data "url=connector_url"
```

* Create your channel
```bash
$ curl -X  POST \
  --data "slug=YOUR_CHANNEL_SLUG" --data "isActivated=true" --data "type=kik" \
  --data "apiKey=YOUR_API_KEY" --data "webhook=YOUR_NGROK_URL" --data "userName=YOUR_BOT_NAME" \
  "http://localhost:8080/connectors/:connector_id/channels"
```

## Your bot

A small example of bot:
```javascript
 import express from 'express'
 import bodyParser from 'body-parser'
 import request from 'superagent'
 
 const app = express()
 app.set('port', process.env.PORT || 5000)
 app.use(bodyParser.json())
 
 const config = { url: 'http://localhost:8080', connectorId: 'yourConnectorId' }
 
   /* Get the request from the connector */
 
 app.post('/', (req, res) => {
   const conversationId = req.body.message.conversation
   const messages = [{
     type: 'text',
     content: 'my first message',
   }]
 
   /* Send the message back to the connector */
   request.post(`${config.url}/connectors/${config.connectorId}/conversations/${conversationId}/messages`)
     .send({ messages, senderId: req.body.senderId })
     .end((err, res) => {
       if (err) {
         console.log(err)
       } else {
         console.log(res)
       }
     })
 })
 
 app.listen(app.get('port'), () => {
   console.log('Our bot is running on port', app.get('port'))
 })
```