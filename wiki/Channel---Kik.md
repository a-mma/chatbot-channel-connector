## Set up your Kik account

### Install Kik on your phone

Download Kik from the App store or Googleplay store, depending on your device.
Follow the procedure to create your account if you don\'t already have one.

### Scan the code

Scan the code that appears on your Kik app by following [this link](https://dev.kik.com).
![Scan Code Kik](https://cdn.recast.ai/man/recast-ai-kik-3.png)
Log in to your dashboard using *Botsworth*.

### Create your bot

Converse with *Botsworth* to create a new bot. He will guide you through each step.
![Bot Creation Kik](https://cdn.recast.ai/man/recast-ai-kik-1.png)

### Get your bot name and your API key

On your computer, go to the Configuration tab to see the settings of your freshly created bot.
![Bot Creation Kik](https://cdn.recast.ai/man/recast-ai-kik-2.png)
You can now paste your **username** and your **API Key** in the form below.

## Start your bot in local

#### Ngrok

* Download the appropriate version of [Ngrok](https://ngrok.com/download) on your computer
* Open a new tab in your terminal:
```
./ngrok http 8080
```
* Copy and paste the ``` https://*******ngrok.io``` you get, you will need it for the next step
* Leave your Ngrok serveur running

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