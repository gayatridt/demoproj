const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message',
  MESSAGE_NOT_FOUND: 'message-not-found',
};

const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
};

const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network. Please try again.',
  [SERVER.AUTH_INSUFFICIENT]: 'Your username is not permitted. Please try a different username.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid username (letters and/or numbers only).',
  [SERVER.REQUIRED_MESSAGE]: 'Message content cannot be empty.',
  default: 'Something went wrong. Please try again.',
};

module.exports = { SERVER, CLIENT, MESSAGES };