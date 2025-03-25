const crypto = require('crypto');

const activeSessions = {};

function createSession(username) {
  const sid = crypto.randomUUID();
  activeSessions[sid] = { username, createdAt: new Date().toISOString() };
  return sid;
}

function getUserBySession(sid) {
  return activeSessions[sid]?.username;
}

function removeSession(sid) {
  delete activeSessions[sid];
}

function fetchAllSessions() {
  return { ...activeSessions };
}

module.exports = { createSession, getUserBySession, removeSession, fetchAllSessions };