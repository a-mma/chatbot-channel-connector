import MessageController from '../controllers/messages'

export default [
  /**
  * @api {post} /connectors/:connectorId/conversations/:conversation_id/messages Post a message into a specific conversation
  * @apiName Post a message to a conversation
  * @apiGroup Messages
  *
  * @apiDescription Post a message into a specific conversation. With this route, you do not have to only answer to an user as response of a previous message, we can also directly send him messages
  *
  * @apiParam (Route Parameters) {ObjectId} connectorId connector id
  * @apiParam (Route Parameters) {ObjectId} conversation_id Conversation ObjectId
  *
  * @apiParam (Text message parameters) {String} type=text Must be 'text' in this case
  * @apiParam (Text message parameters) {String} value Your message
  *
  * @apiParam (Quick replies parameters) {String} type=quickReplies Must be 'quickReplies' in this case
  * @apiParam (Quick replies parameters) {Object[]} value Array of quick reply
  * @apiParam (Quick replies parameters) {String} value.title Title of a quick reply button. This title will appear on channel UI
  * @apiParam (Quick replies parameters) {String} value.value Value of a quick reply button. This title will not appear on channel UI, but this will be sent to your bot if user click on it
  *
  * @apiParam (Picture message parameters) {String} type=picture Must be 'picture' in this case
  * @apiParam (Picture message parameters) {String} value URL of your image
  *
  * @apiParam (Video message parameters) {String} type=video Must be 'video' in this case
  * @apiParam (Video message parameters) {String} value URL of your video
  *
  * @apiParam (Card message parameters) {String} type=card Must be 'card' in this case
  * @apiParam (Card message parameters) {Object[]} value Array of card
  * @apiParam (Card message parameters) {String} value.title Card title
  * @apiParam (Card message parameters) {String} value.imageUrl URL of the card image
  * @apiParam (Card message parameters) {Object[]} value.buttons Array of card buttons
  * @apiParam (Card message parameters) {String} value.buttons.title Title of the card button. This title will appear on channel UI
  * @apiParam (Card message parameters) {String} value.buttons.type
  * @apiParam (Card message parameters) {String} value.buttons.value Value of the card button. This title will not appear on channel UI, but this will be sent to your bot if user click on it
  *
  * @apiSuccess (Success 200) {Message} results Message object
  * @apiSuccess (Success 200) {ObjectId} results.id Message objectId
  * @apiSuccess (Success 200) {String} results.content Message content
  * @apiSuccess (Success 200) {String} results.type Message Type
  * @apiSuccess (Success 200) {Participant} results.participant Message Participant
  * @apiSuccess (Success 200) {String} message Message successfully posted
  *
  * @apiError (Bad Request 400 for conversation_id) {null} results Response data
  * @apiError (Bad Request 400 for conversation_id) {String} message Parameter conversation_id is invalid
  *
  * @apiError (Not found 404 for connector) {null} results Response data
  * @apiError (Not found 404 for connector) {String} message Connector not found
  *
  * @apiError (Not found 404 for conversation) {null} results Response data
  * @apiError (Not found 404 for conversation) {String} message Conversation not found
  *
  * @apiError (Internal Server Error 500 if bot participant not found) {null} results Response data
  * @apiError (Internal Server Error 500 if bot participant not found) {String} message Bot participant not found in this conversation
  */
  {
    method: 'POST',
    path: ['/connectors/:connectorId/conversations/:conversationId/messages'],
    validators: [],
    authenticators: [],
    handler: MessageController.postMessage,
  },

  /**
  * @api {post} /messages Post a message to a specific bot
  * @apiName Post a message to a bot
  * @apiGroup Connector
  *
  * @apiDescription Post a message to a specific bot. With this route, you do not have to only answer to a user in response to a previous message, we can also directly send them messages

  * @apiParam {String} connectorId connector id
  *
  * @apiParam (Text message parameters) {String} type=text Must be 'text' in this case
  * @apiParam (Text message parameters) {String} value Your message
  *
  * @apiParam (Quick replies parameters) {String} type=quickReplies Must be 'quickReplies' in this case
  * @apiParam (Quick replies parameters) {Object[]} value Array of quick reply
  * @apiParam (Quick replies parameters) {String} value.title Title of a quick reply button. This title will appear on channel UI
  * @apiParam (Quick replies parameters) {String} value.value Value of a quick reply button. This title will not appear on channel UI, but this will be sent to your bot if user click on it
  *
  * @apiParam (Picture message parameters) {String} type=picture Must be 'picture' in this case
  * @apiParam (Picture message parameters) {String} value URL of your image
  *
  * @apiParam (Video message parameters) {String} type=video Must be 'video' in this case
  * @apiParam (Video message parameters) {String} value URL of your video
  *
  * @apiParam (Card message parameters) {String} type=card Must be 'card' in this case
  * @apiParam (Card message parameters) {Object[]} value Array of card
  * @apiParam (Card message parameters) {String} value.title Card title
  * @apiParam (Card message parameters) {String} value.imageUrl URL of the card image
  * @apiParam (Card message parameters) {Object[]} value.buttons Array of card buttons
  * @apiParam (Card message parameters) {String} value.buttons.title Title of the card button. This title will appear on channel UI
  * @apiParam (Card message parameters) {String} value.buttons.type
  * @apiParam (Card message parameters) {String} value.buttons.value Value of the card button. This title will not appear on channel UI, but this will be sent to your bot if user click on it
  *
  * @apiSuccess (Success 200) {Message[]} results Message array
  * @apiSuccess (Success 200) {ObjectId} results.id Message objectId
  * @apiSuccess (Success 200) {String} results.content Message content
  * @apiSuccess (Success 200) {String} results.type Message Type
  * @apiSuccess (Success 200) {Participant} results.participant Message Participant
  * @apiSuccess (Success 200) {String} message Message successfully posted
  *
  * @apiError (Not found 404 for connector) {null} results Response data
  * @apiError (Not found 404 for connector) {String} message Connector not found
  *
  * @apiError (Not Found 404 if bot participant not found) {null} results Response data
  * @apiError (Not Found 404 if bot participant not found) {String} message Bot participant not found in this conversation
  */
  {
    method: 'POST',
    path: ['/connectors/:connectorId/messages'],
    validators: [],
    authenticators: [],
    handler: MessageController.broadcastMessage,
  },
]
