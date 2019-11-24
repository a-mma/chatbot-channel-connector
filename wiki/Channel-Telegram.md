# Telegram

## Setup your Telegram account

### Connect

Download the client for your OS on the [Telegram website](https://telegram.org).
Launch Telegram and create a new account :
![telegram signup](https://cdn.recast.ai/man/recast-ai-telegram-step-1.png)

### Search for BotFather and start talking

On the left panel search for **BotFather**.
![telegram search](https://cdn.recast.ai/man/recast-ai-telegram-step-2.png)

### Ask the BotFather to create your new bot

Ask BotFather to create your bot by typing the command `/newbot` in the conversation panel.
![telegram search](https://cdn.recast.ai/man/recast-ai-telegram-step-3.png)
Answer every question directly in the chat to configure your bot.
![telegram search](https://cdn.recast.ai/man/recast-ai-telegram-step-4.png)

### Ask for your token

Ask BotFather to get your token by typing the command `/token` in the conversation panel.
![telegram search](https://cdn.recast.ai/man/recast-ai-telegram-step-5.png)

### Paste your token on the field below

Copy your **token**, you will need it to create your channel.
![telegram search](https://cdn.recast.ai/man/recast-ai-telegram-step-6.png)

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