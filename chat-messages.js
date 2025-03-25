const uuid = require('crypto').randomUUID;

function createChatMessageStore() {
  const id1 = uuid();
  const id2 = uuid();

  const chatMessages = {
    [id1]: {
      id: id1,
      username: 'Tim',
      message: 'Hello, everyone!',
      timestamp: new Date().toISOString(),
    },
    [id2]: {
      id: id2,
      username: 'Jenson',
      message: 'Welcome!',
      timestamp: new Date().toISOString(),
    },
  };

  const chatMessageStore = {};

  chatMessageStore.contains = function contains(id) {
    return !!chatMessages[id];
  };

  chatMessageStore.getMessages = function getMessages() {
    return Object.values(chatMessages);
  };

  chatMessageStore.addMessage = function addMessage(username, message) {
    const id = uuid();
    chatMessages[id] = {
      id,
      username,
      message,
      timestamp: new Date().toISOString(),
    };
    return id;
  };

  chatMessageStore.getMessage = function getMessage(id) {
    return chatMessages[id];
  };

  chatMessageStore.updateMessage = function updateMessage(id, newContent) {
    if (!chatMessages[id]) return false;
    chatMessages[id].message = newContent || chatMessages[id].message;
    return true;
  };

  chatMessageStore.deleteMessage = function deleteMessage(id) {
    delete chatMessages[id];
  };

  return chatMessageStore;
}

module.exports = createChatMessageStore();