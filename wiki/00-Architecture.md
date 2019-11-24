# Bot Connector's architecture

## Presentation:
```bash
src
├── controllers
│   ├── App.controller.js
│   ├── Bots.controller.js
│   ├── Channels.controller.js
│   ├── Conversations.controller.js
│   ├── Messages.controller.js
│   ├── Participants.controller.js
│   └── Webhooks.controller.js
├── index.js
├── models
│   ├── Bot.model.js
│   ├── Channel.model.js
│   ├── Conversation.model.js
│   ├── index.js
│   ├── Message.model.js
│   └── Participant.model.js
├── routes
│   ├── App.routes.js
│   ├── Bots.routes.js
│   ├── Channels.routes.js
│   ├── Conversations.routes.js
│   ├── index.js
│   ├── Messages.routes.js
│   ├── Participants.routes.js
│   └── Webhooks.routes.js
├── services
│   ├── Kik.service.js
│   ├── Messenger.service.js
│   ├── Slack.service.js
│   └── Template.service.js
├── test.js
├── utils
│   ├── errors.js
│   ├── format.js
│   ├── index.js
│   ├── init.js
│   └── Logger.js
└── validators
    ├── Bots.validators.js
    ├── Channels.validators.js
    ├── Conversations.validators.js
    ├── Participants.validators.js
    └── Webhooks.validators.js

6 directories, 37 files
```

### Controllers

Controllers are the main part of Connector.
They handle the logic for each routes, and each one is linked to a particular resource (Bot, Channel,...)

### Models

Each Model is the representation of a resource in MongoDB, along with some helpers like the serialisation function.

### Routes

Each file in the Route directory contains a path, a method along with validators and a handler (a Controller specific function).

### Services

Services represent the wrapper around channels (Messenger, Kik,...). They implement various functions called by the Controllers at specific points.

Here's the list of the Services currently supported:
* [Kik](https://github.com/RecastAI/bot-connector/wiki/Channel---Kik)
* [Slack](https://github.com/RecastAI/bot-connector/wiki/Channel---Slack)
* [Messenger](https://github.com/RecastAI/bot-connector/wiki/Channel---Messenger)
* [Callr](https://github.com/RecastAI/bot-connector/wiki/Channel-CALLR)
* [Telegram](https://github.com/RecastAI/bot-connector/wiki/Channel-Telegram)
* [Twilio](https://github.com/RecastAI/bot-connector/wiki/Channel-Twilio)

If you'd like to add a channel, you can find guidelines here: [add my channel](https://github.com/RecastAI/bot-connector/wiki/01---Add-a-channel)

### Validators

Validators are called by the route, to ensure that the data received by the requests match those expected. If so, the request continues to the Controller handler. If not, an error is returned,

### Utils

The utils folder contains various tools, like a Logger, the Errors the Connector can return, and so on.
