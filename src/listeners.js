import { loginUser, logoutUser, getChatMessages, sendChatMessage, removeChatMessage, getOnlineUsers, getAllRegisteredUsers } from './services';
import appState, { login, logout, setMessages, setUsers, setAllUsers, setError, startLoginPending, clearError } from './state';
import renderView from './render';

let pollingInterval;

export function setupLoginHandler({ appState, appEl }) {
  appEl.addEventListener('submit', (e) => {
    if (!e.target.classList.contains('login__form')) return;
    e.preventDefault();

    const usernameInput = appEl.querySelector('.login__username');
    if (!usernameInput) {
      console.error('Login input element not found');
      setError('Login input not found');
      renderView({ appState, appEl });
      return;
    }

    const username = usernameInput.value.trim();
    if (!username) {
      setError('Username is required');
      renderView({ appState, appEl });
      return;
    }

    startLoginPending();
    renderView({ appState, appEl });

    loginUser(username)
      .then(() => {
        login(username);
        clearError();
        return Promise.all([getChatMessages(), getOnlineUsers(), getAllRegisteredUsers()]);
      })
      .then(([messages, users, allUsers]) => {
        setMessages(messages);
        setUsers(users);
        setAllUsers(allUsers);
        startMessagePolling({ appState, appEl });
        renderView({ appState, appEl });
      })
      .catch(err => {
        setError(err.error);
        appState.loginInProgress = false;
        renderView({ appState, appEl });
      });
  });
}

export function setupLogoutHandler({ appState, appEl }) {
  appEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('controls__logout')) return;

    logoutUser()
      .then(() => {
        logout();
        clearError();
        stopMessagePolling();
        renderView({ appState, appEl });
      })
      .catch(err => {
        setError(err.error);
        renderView({ appState, appEl });
      });
  });
}

export function setupMessageHandler({ appState, appEl }) {
  appEl.addEventListener('input', (e) => {
    if (e.target.classList.contains('message__input')) {
      appState.messageInputValue = e.target.value || '';
    }
  });

  appEl.addEventListener('submit', (e) => {
    if (!e.target.classList.contains('message__form')) return;
    e.preventDefault();

    const message = (appState.messageInputValue || '').trim();
    if (!message) {
      setError('Message cannot be empty');
      renderView({ appState, appEl });
      return;
    }

    sendChatMessage(message)
      .then(() => {
        appState.messageInputValue = ''; 
        clearError();
        renderView({ appState, appEl });
      })
      .catch(err => {
        setError(err.error);
        renderView({ appState, appEl });
      });
  });
}

export function setupDeleteMessageHandler({ appState, appEl }) {
  appEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('message__delete')) {
      const messageId = e.target.getAttribute('data-id');
      removeChatMessage(messageId)
        .then(response => {
          if (response.success) {
            appState.messages = appState.messages.filter(msg => msg.id !== messageId);
            renderView({ appState, appEl });
          }
        })
        .catch(err => {
          setError(err.error);
          renderView({ appState, appEl });
        });
    }
  });
}

export function startMessagePolling({ appState, appEl }) {
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }
  pollingInterval = setInterval(() => {
    if (!appState.userIsLoggedIn) {
      stopMessagePolling();
      return;
    }
    Promise.all([getChatMessages(), getOnlineUsers(), getAllRegisteredUsers()])
      .then(([newMessages, newUsers, newAllUsers]) => {
        const isMessagesUpdated = JSON.stringify(newMessages) !== JSON.stringify(appState.messages);
        const isUsersUpdated = JSON.stringify(newUsers) !== JSON.stringify(appState.users);
        const isAllUsersUpdated = JSON.stringify(newAllUsers) !== JSON.stringify(appState.allUsers);

        if (isMessagesUpdated) {
          setMessages(newMessages);
        }
        if (isUsersUpdated) {
          setUsers(newUsers);
        }
        if (isAllUsersUpdated) {
          setAllUsers(newAllUsers);
        }

        if (isMessagesUpdated || isUsersUpdated || isAllUsersUpdated) {
          renderView({ appState, appEl });
        }
      })
      .catch(err => {
        if (err.error === 'auth-missing') {
          logout();
          setError('Session expired. Please log in again.');
          stopMessagePolling();
          renderView({ appState, appEl });
          return;
        }
        if (!appState.errorMessage) {
          setError(err.error);
          renderView({ appState, appEl });
        }
      });
  }, 5000);
}

function stopMessagePolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}