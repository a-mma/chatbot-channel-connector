## Setup your CALLR account

### Create a CALLR channel

Create a new app on CALLR with this <a href="https://callr.com/?utm_source=recastai&utm_medium=partner&utm_campaign=botconnector&utm_content=stepbystep" target="_blank">link</a>.
Click on « Sign up » to make an account on the website and follow the steps.
![Callr channel credentials](https://cdn.recast.ai/man/recast-ai-callr-step-1.png)'

### Get your credentials

Once you have signed up, you will receive your credentials by mail. Copy your **username** and **password**, you will need it later.
![Callr channel credentials](https://cdn.recast.ai/man/recast-ai-callr-step-4.png)

### Activate your account

Don’t forget to validate your CALLR account <a href="https://thecallr.com/s/" target="_blank">here</a>. Validation is necessary to enable SMS sending.

## Start your bot in local

### Ngrok

* Download the appropriate version of Ngrok on your computer
* Open a new tab in your terminal:

```
./ngrok http 8080
```

* Copy and paste the https://*******ngrok.io you get, you will need it for the next step
* Leave your Ngrok serveur running*



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