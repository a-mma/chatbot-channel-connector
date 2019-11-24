## Set up your Facebook page

### Create a Facebook page

Create a new Facebook page using <a href="https://www.facebook.com/bookmarks/pages" target="_blank">this link</a>.
![facebook page creation](https://cdn.recast.ai/man/recast-ai-messenger-0.png)

### Create a Facebook app

Create a new Facebook app using <a href="https://developers.facebook.com/" target="_blank">this link</a>.
![facebook page creation](https://cdn.recast.ai/man/recast-ai-messenger-8.png)

### Get your page token

On the left menu, add a new product and select Messenger.
![facebook page creation](https://cdn.recast.ai/man/recast-ai-messenger-10.png)
Select your Facebook page and copy the token:
![facebook page creation](https://cdn.recast.ai/man/recast-ai-messenger-4.png)
Copy the **Page token**, you will need it later to create your channel.

### Get your App Secret

Go on the dashboard tab, show and copy your App secret.
![facebook page creation](https://cdn.recast.ai/man/recast-ai-messenger-7.png)
Create your channel with the **App Secret** and the **Page Token**.

### Set the Facebook callback URL

Now go on the Messenger menu and click on the **Setup Webhook** button.
![find facebook config webhook](https://cdn.recast.ai/man/recast-ai-messenger-9.png)
Set the Callback Url and the Verify Token with the ones we provide.
![find facebook config webhook](https://cdn.recast.ai/man/recast-ai-messenger-2.png)

### Activate your page

In this webhook section, select your page in the drop down menu, and click on subscribe.
![fill facebook config webhook](https://cdn.recast.ai/man/recast-ai-messenger-6.png)

## Start Connector in local

* Clone and install Connector
```bash
$ git clone https://github.com/SAPConversationalAI/bot-connector.git
$ cd bot-connector
$ yarn install
$ yarn start-dev
```

* Create your connector
```bash
$ curl -X POST "http://localhost:8080/connectors/" --data "url=bot_url"
```

* Create your channel
```bash
$ curl -X  POST \
  --data "slug=YOUR_CHANNEL_SLUG" --data "isActivated=true" --data "type=messenger" \
  --data "apiKey=YOUR_API_KEY" --data "webhook=YOUR_NGROK_URL" --data "token=YOUR_PAGE_TOKEN" \
  "http://localhost:8080/connectors/:connector_id/channels"
```

#### Ngrok

* Download the appropriate version of [Ngrok](https://ngrok.com/download).
* Open a new tab in your terminal:
```
./ngrok http 8080
```
* Copy past the ``` https://*******ngrok.io``` you get, you will need it for the next step.
* Leave your Ngrok serveur running.

#### Config webhook

* go back to the Facebook Developer page and add a new webhook.

[webhook]: https://raw.githubusercontent.com/RecastAI/bot-connector/master/resources/messenger/messenger.jpg "Webhook page"
![alt text][webhook]

* Subscribe your page to the webhook you just created.
* Your token is the slug of your bot.

[suscribe]: https://raw.githubusercontent.com/RecastAI/bot-messenger/master/ressources/S%C3%A9lection_024.png "Subscribe page"

![alt text][suscribe]

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