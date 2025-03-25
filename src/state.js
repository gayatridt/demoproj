import { MESSAGES } from './constants';

const appState = {
  messages: [],
  users: [],    
  allUsers: [], 
  userIsLoggedIn: false,
  loginInProgress: false,
  chatInProgress: false,
  errorMessage: '',
  currentUser: ''
};

export function login(username) {
  appState.userIsLoggedIn = true;
  appState.loginInProgress = false;
  appState.currentUser = username;
  appState.errorMessage = '';
}

export function logout() {
  appState.userIsLoggedIn = false;
  appState.loginInProgress = false;
  appState.currentUser = '';
  appState.messages = [];
  appState.users = [];   
  appState.errorMessage = '';
}

export function setMessages(newMessages) {
  appState.messages = newMessages;
  appState.chatInProgress = false;
  appState.errorMessage = '';
}

export function setUsers(newUsers) {
  const activeUsers = new Set(newUsers);
  appState.users = appState.users.filter(user => activeUsers.has(user));
  appState.users = [...newUsers];
}

export function setAllUsers(newAllUsers) {
  appState.allUsers = newAllUsers;
}

export function setError(error) {
  appState.errorMessage = MESSAGES[error] || MESSAGES.default;
  appState.chatInProgress = false;
  appState.loginInProgress = false;
}

export function startLoginPending() {
  appState.loginInProgress = true;
  appState.errorMessage = '';
}

export function startChatPending() {
  appState.chatInProgress = true;
  appState.errorMessage = '';
}

export function clearError() {
  appState.errorMessage = '';
}

export function setSession(username) {
  appState.userIsLoggedIn = true;
  appState.currentUser = username;
  appState.loginInProgress = false;
  appState.errorMessage = '';
}

export default appState;
