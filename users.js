const userDatabase = {};

function validateUsername(username) {
  return !!username && /^[A-Za-z0-9_]+$/.test(username);
}

function isUsernameAllowed(username) {
  return username !== 'dog';
}

function fetchAllUsers() {
  return Object.keys(userDatabase);
}

function fetchUserData(username) {
  return userDatabase[username];
}

function addUserToDatabase(username) {
  if (!userDatabase[username]) {
    userDatabase[username] = { messages: [] };
  }
}

function addMessageToUser(username, message) {
  if (userDatabase[username]) {
    userDatabase[username].messages.push({ message, timestamp: new Date().toISOString() });
  }
}

function fetchUserMessages(username) {
  return userDatabase[username] ? userDatabase[username].messages : [];
}

module.exports = {
  validateUsername,
  isUsernameAllowed,
  fetchUserData,
  addUserToDatabase,
  addMessageToUser,
  fetchUserMessages,
  fetchAllUsers,
};