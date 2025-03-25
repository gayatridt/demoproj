function renderView({ appState, appEl }) {
  const html = `
    <main>
      ${renderStatusMessage(appState)}
      ${renderLoginForm(appState)}
      ${renderChatInterface(appState)}
    </main>
  `;
  appEl.innerHTML = html;
}

function renderStatusMessage(appState) {
  return appState.errorMessage ? `<div class="status error">${appState.errorMessage}</div>` : '';
}

function renderLoginForm(appState) {
  if (appState.userIsLoggedIn) {
    return '';
  }
  if (appState.loginInProgress) {
    return `
      <div class="login__waiting">Loading user...</div>
    `;
  }
  return `
    <div class="login">
      <h2 class="login__title">Login</h2>
      <form class="login__form" action="#login">
        <label>
          <span>Username:</span>
          <input class="login__username" type="text" value="${appState.loginInputValue || ''}">
        </label>
        <button class="login__button" type="submit">Login</button>
      </form>
    </div>
  `;
}

function renderChatInterface(appState) {
  if (!appState.userIsLoggedIn) return '';
  
  const messagesHtml = appState.messages.map(msg => {
    const isUserMessage = msg.username === appState.currentUser;
    return `
      <div class="message">
        <span class="message__username">${msg.username}:</span> ${msg.message}
        ${isUserMessage ? `<button class="message__delete" data-id="${msg.id}">Delete</button>` : ''}
      </div>
    `;
  }).join('');

  return `
    <div class="chat-header">
      <h2 class="chat-header__title">Chat Room</h2>
      <button class="controls__logout">Logout</button>
    </div>
    <div class="chat">
      <div class="user-list">
        <h3 class="user-list__title">Online Users</h3>
        <div class="user-list__content">${renderUserList(appState)}</div>
      </div>
      <div class="messages">
        <div class="messages__content">${messagesHtml}</div>
        ${renderMessageInputForm(appState)}
      </div>
    </div>
  `;
}

function renderUserList(appState) {
  if (!appState.users || appState.users.length === 0) {
    return '<div class="user__name">No users online</div>';
  }

  return appState.users.map(user => `
    <div class="user__name">
      <span class="user__status"></span> 
      ${user}
    </div>
  `).join('');
}

function renderControlButtons(appState) {
  return `
    <div class="controls">
      <button class="controls__logout">Logout</button>
    </div>
  `;
}

function renderMessageInputForm(appState) {
  return `
    <form class="message__form" action="#send">
      <label for="message__input" class="message__label">Type a message:</label>
      <input id="message__input" class="message__input" type="text" placeholder="Type a message..." value="${appState.messageInputValue || ''}">
      <button type="submit" class="message__button">Send</button>
    </form>
  `;
}

export default renderView;