# Add a channel to Connector

To add a channel:
* your file must be in ```src/services```
* the name of your file must be ```nameOfChannel.service.js```
* your service must inherit from Template.service.js, as follows:
```javascript
import ServiceTemplate from './Template.service.js'

export default class nameOfYourChannelService extends ServiceTemplate {
/* your code */
}
```

A good starting point is to look at the existing channels.

You can also find more information [here](https://blog.recast.ai/new-channel-bc/).

### Functions

The Service template, in ```src/services/Template.service.js```, contains all the functions you need to implement.

```javascript
import { noop } from '../utils'

export default class ServiceTemplate {

  /* Call when the Connector is launched */
  static onLaunch = noop

  /* Check parameter validity to create a Channel */
  static checkParamsValidity = noop

  /* Call when a channel is created */
  static onChannelCreate = noop

  /* Call when a channel is updated */
  static onChannelUpdate = noop

  /* Call when a channel is deleted */
  static onChannelDelete = noop

  /* Call when a message is received for security purpose */
  static checkSecurity = noop

  /* Call when a message is received, before the pipeline */
  static beforePipeline = noop

  /* Call before entering the pipeline, to build the options object */
  static extractOptions = noop

  /* Call to parse a message received from a channel */
  static parseChannelMessage = noop

  /* Call to format a message received by the bot */
  static formatMessage = noop

  /* Call to send a message to a bot */
  static sendMessage = noop
}
```

Each function is called at a specific time in the Connector flow.
There are two categories of functions:
* **Primary functions**: those are required. If you don't implement them, your Service won't work.
* **Secondary functions**: those are functions that you may need to implement, depending of the channel you're working on.

#### Primary functions
* ```parseChannelMessage``` parse the incoming message of the channel to shape it in the Connector format.
* ```extractOptions``` extract the information we need to get back in the message (chatId, id, senderid, ect).
* ```formatMessage``` format the message according to the channel it will be sent to
* ```sendMessage``` send the message to the channel

#### Secondary functions
* ```beforePipeline``` is called when a message is received from the channel, before processing the message
* ```checkSecurity``` checks that the message is coming from the channel
* ```checkParamsValidity``` checks parameters validity when sending a message
* ```onLaunch``` is called when the connector is launched
* ```onChannelCreate``` is called when a channel is created
* ```onChannelUpdate``` is called when a channel is updated
* ```onChannelDelete``` is called when a channel is deleted

### Ideas of channel

* Discord
* Line
* Cisco Spark
* Twilio
* Telegram
* and every other you can think of! :+1: 