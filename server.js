const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const activeSessions = require('./sessions');
const userDatabase = require('./users');
const chatMessageStore = require('./chat-messages');
const { SERVER } = require('./src/constants');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

function validateSession(req, res, next) {
  const sid = req.cookies.sid;
  const username = sid ? activeSessions.getUserBySession(sid) : '';
  if (!sid || !userDatabase.validateUsername(username)) {
    res.status(401).json({ error: SERVER.AUTH_MISSING });
    return;
  }
  req.username = username;
  next();
}

app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? activeSessions.getUserBySession(sid) : '';
  if (!sid || !userDatabase.validateUsername(username)) {
    res.status(401).json({ error: SERVER.AUTH_MISSING });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  if (!userDatabase.validateUsername(username)) {
    res.status(400).json({ error: SERVER.REQUIRED_USERNAME });
    return;
  }
  if (!userDatabase.isUsernameAllowed(username)) {
    res.status(403).json({ error: SERVER.AUTH_INSUFFICIENT });
    return;
  }
  const sid = activeSessions.createSession(username);
  res.cookie('sid', sid);

  userDatabase.addUserToDatabase(username);

  res.json({ username });
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  if (sid) {
    res.clearCookie('sid');
    activeSessions.removeSession(sid);
  }
  res.json({ message: 'Logged out' });
});

app.get('/api/messages', validateSession, (req, res) => {
  res.json(chatMessageStore.getMessages());
});

app.post('/api/messages', validateSession, (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: SERVER.REQUIRED_MESSAGE });
    return;
  }
  chatMessageStore.addMessage(req.username, message.trim());
  res.json({ message: 'Message added' });
});

app.delete('/api/messages/:id', validateSession, (req, res) => {
  const { id } = req.params;
  if (chatMessageStore.contains(id)) {
    chatMessageStore.deleteMessage(id);
    return res.json({ success: true });
  }
  res.status(404).json({ error: 'message-not-found' });
});

app.get('/api/users', validateSession, (req, res) => {
  const allSessions = activeSessions.fetchAllSessions();
  const usernames = Object.values(allSessions).map(session => session.username);
  res.json(usernames);
});

app.get('/api/allusers', validateSession, (req, res) => {
  const allUsers = userDatabase.fetchAllUsers();
  res.json(allUsers);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));