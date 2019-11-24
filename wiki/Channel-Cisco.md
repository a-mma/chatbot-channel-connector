# Cisco

## Setup your Cisco Spark account

### Create your account

Go to [Cisco Spark for Developers](https://developer.ciscospark.com/index.html) and sign up for an account.
If you already have a Cisco Spark account, you can use the same credentials to login.

![Cisco account](https://cdn.recast.ai/man/recast-ai-cisco-2.png)

### Create a bot

Click on *My Apps* in the header, then on the + button to create a new Bot.
Fill in the Bot Creation form, and click on Add Bot to generate your Bot token.

![Bot form](https://cdn.recast.ai/man/recast-ai-cisco-1.png)

### Get your credentials

You now have a brand new bot. Copy the token, you need it to create your Cisco channel.
![Cisco Spark](https://cdn.recast.ai/man/recast-ai-cisco-3.png)

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
  --data "slug=YOUR_CHANNEL_SLUG" --data "token=YOUR_CISCO_TOKEN" --data "type=cisco" \
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