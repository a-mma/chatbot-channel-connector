# Microsoft Bot Framework

## Setup your Microsoft Bot Framework account

### Login on Microsoft

Go on [Microsoft Bot Framework](https://dev.botframework.com/bots) and create an account.

### Create a new bot

Once you are logged in, click on My bots in the header and then on Create a bot.

![Microsoft](https://cdn.recast.ai/bot-connector/recast-ai-mbf-9.png)

Fill in the fields appearing in the pop-up window, such as the name of your bot and a description.

In the Configuration section, click on Create Microsoft App ID and password to create a new app linked to your bot.

![Microsoft](https://cdn.recast.ai/bot-connector/recast-ai-mbf-7.png)

A new window opens. Fill in the form below with the App Id and password, then click on Finish and go back to Bot Framework.

![Microsoft](https://cdn.recast.ai/bot-connector/recast-ai-mbf-4.png)

Finally, click on Register to create your bot.

![Microsoft](https://cdn.recast.ai/bot-connector/recast-ai-mbf-3.png)


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
  --data "slug=YOUR_CHANNEL_SLUG" --data "type=microsoft" \
  --data "clientId=MICROSOFT_CLIENT_ID" --data "clientSecret=MICROSOFT_CLIENT_SECRET" \
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