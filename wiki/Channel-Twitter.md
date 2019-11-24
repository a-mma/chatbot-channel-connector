# Twitter

### Disclaimer

The Twitter's Account Activity API is still currently in beta.
Once you have created your app, ask Twitter for access using this [form](https://gnipinc.formstack.com/forms/account_activity_api_configuration_request_form). The process can take a few days.

## Setup your Twitter account

### Create a Twitter App

Go on [Twitter App](https://apps.twitter.com/) and click on Create New App.

![Twitter account](https://cdn.recast.ai/bot-connector/twitter-4.png)

Fill in the Name, Description and Website fields, and leave the Callback URL empty.

![Twitter form](https://cdn.recast.ai/bot-connector/twitter-2.png)

Important: the Twitter's Direct message API is still in beta, ask them for access using this form. The process can take a few days.

### Enable Direct Messages

Go in the Permissions tab of your application, and enable Read, Write and Access direct messages.

![Permisions](https://cdn.recast.ai/bot-connector/twitter-3.png)

### Get your credentials

Go in the Keys and Access Tokens tab of your application, and click on Create your Access Token.

Get your Consumer Key, Consumer Secret, Access Token and Access Token Secret and fill in the form below.

![Permisions](https://cdn.recast.ai/bot-connector/twitter-1.png)

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
  --data "slug=YOUR_CHANNEL_SLUG" --data "type=twitter" \
  --data "consumerKey=TWITTER_CONSUMER_KEY" --data "consumerSecret=TWITTER_CONSUMER_SECRET" \
  --data "accessToken=TWITTER_ACCESS_TOKEN" --date "accessTokenSecret=TWITTER_ACCESS_TOKEN_SECRET" \
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