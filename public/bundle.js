/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((module) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message',
  MESSAGE_NOT_FOUND: 'message-not-found'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network. Please try again.'), SERVER.AUTH_INSUFFICIENT, 'Your username is not permitted. Please try a different username.'), SERVER.REQUIRED_USERNAME, 'Please enter a valid username (letters and/or numbers only).'), SERVER.REQUIRED_MESSAGE, 'Message content cannot be empty.'), "default", 'Something went wrong. Please try again.');
module.exports = {
  SERVER: SERVER,
  CLIENT: CLIENT,
  MESSAGES: MESSAGES
};

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setupDeleteMessageHandler: () => (/* binding */ setupDeleteMessageHandler),
/* harmony export */   setupLoginHandler: () => (/* binding */ setupLoginHandler),
/* harmony export */   setupLogoutHandler: () => (/* binding */ setupLogoutHandler),
/* harmony export */   setupMessageHandler: () => (/* binding */ setupMessageHandler),
/* harmony export */   startMessagePolling: () => (/* binding */ startMessagePolling)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var pollingInterval;
function setupLoginHandler(_ref) {
  var appState = _ref.appState,
    appEl = _ref.appEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('login__form')) return;
    e.preventDefault();
    var usernameInput = appEl.querySelector('.login__username');
    if (!usernameInput) {
      console.error('Login input element not found');
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)('Login input not found');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appState: appState,
        appEl: appEl
      });
      return;
    }
    var username = usernameInput.value.trim();
    if (!username) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)('Username is required');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appState: appState,
        appEl: appEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.startLoginPending)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      appState: appState,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.loginUser)(username).then(function () {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(username);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.clearError)();
      return Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_0__.getChatMessages)(), (0,_services__WEBPACK_IMPORTED_MODULE_0__.getOnlineUsers)(), (0,_services__WEBPACK_IMPORTED_MODULE_0__.getAllRegisteredUsers)()]);
    }).then(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 3),
        messages = _ref3[0],
        users = _ref3[1],
        allUsers = _ref3[2];
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUsers)(users);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setAllUsers)(allUsers);
      startMessagePolling({
        appState: appState,
        appEl: appEl
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appState: appState,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
      appState.loginInProgress = false;
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appState: appState,
        appEl: appEl
      });
    });
  });
}
function setupLogoutHandler(_ref4) {
  var appState = _ref4.appState,
    appEl = _ref4.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('controls__logout')) return;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.logoutUser)().then(function () {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.clearError)();
      stopMessagePolling();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appState: appState,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appState: appState,
        appEl: appEl
      });
    });
  });
}
function setupMessageHandler(_ref5) {
  var appState = _ref5.appState,
    appEl = _ref5.appEl;
  appEl.addEventListener('input', function (e) {
    if (e.target.classList.contains('message__input')) {
      appState.messageInputValue = e.target.value || '';
    }
  });
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('message__form')) return;
    e.preventDefault();
    var message = (appState.messageInputValue || '').trim();
    if (!message) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)('Message cannot be empty');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appState: appState,
        appEl: appEl
      });
      return;
    }
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.sendChatMessage)(message).then(function () {
      appState.messageInputValue = '';
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.clearError)();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appState: appState,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appState: appState,
        appEl: appEl
      });
    });
  });
}
function setupDeleteMessageHandler(_ref6) {
  var appState = _ref6.appState,
    appEl = _ref6.appEl;
  appEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('message__delete')) {
      var messageId = e.target.getAttribute('data-id');
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.removeChatMessage)(messageId).then(function (response) {
        if (response.success) {
          appState.messages = appState.messages.filter(function (msg) {
            return msg.id !== messageId;
          });
          (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
            appState: appState,
            appEl: appEl
          });
        }
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          appState: appState,
          appEl: appEl
        });
      });
    }
  });
}
function startMessagePolling(_ref7) {
  var appState = _ref7.appState,
    appEl = _ref7.appEl;
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }
  pollingInterval = setInterval(function () {
    if (!appState.userIsLoggedIn) {
      stopMessagePolling();
      return;
    }
    Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_0__.getChatMessages)(), (0,_services__WEBPACK_IMPORTED_MODULE_0__.getOnlineUsers)(), (0,_services__WEBPACK_IMPORTED_MODULE_0__.getAllRegisteredUsers)()]).then(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 3),
        newMessages = _ref9[0],
        newUsers = _ref9[1],
        newAllUsers = _ref9[2];
      var isMessagesUpdated = JSON.stringify(newMessages) !== JSON.stringify(appState.messages);
      var isUsersUpdated = JSON.stringify(newUsers) !== JSON.stringify(appState.users);
      var isAllUsersUpdated = JSON.stringify(newAllUsers) !== JSON.stringify(appState.allUsers);
      if (isMessagesUpdated) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(newMessages);
      }
      if (isUsersUpdated) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUsers)(newUsers);
      }
      if (isAllUsersUpdated) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setAllUsers)(newAllUsers);
      }
      if (isMessagesUpdated || isUsersUpdated || isAllUsersUpdated) {
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          appState: appState,
          appEl: appEl
        });
      }
    })["catch"](function (err) {
      if (err.error === 'auth-missing') {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)('Session expired. Please log in again.');
        stopMessagePolling();
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          appState: appState,
          appEl: appEl
        });
        return;
      }
      if (!appState.errorMessage) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          appState: appState,
          appEl: appEl
        });
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

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function renderView(_ref) {
  var appState = _ref.appState,
    appEl = _ref.appEl;
  var html = "\n    <main>\n      ".concat(renderStatusMessage(appState), "\n      ").concat(renderLoginForm(appState), "\n      ").concat(renderChatInterface(appState), "\n    </main>\n  ");
  appEl.innerHTML = html;
}
function renderStatusMessage(appState) {
  return appState.errorMessage ? "<div class=\"status error\">".concat(appState.errorMessage, "</div>") : '';
}
function renderLoginForm(appState) {
  if (appState.userIsLoggedIn) {
    return '';
  }
  if (appState.loginInProgress) {
    return "\n      <div class=\"login__waiting\">Loading user...</div>\n    ";
  }
  return "\n    <div class=\"login\">\n      <h2 class=\"login__title\">Login</h2>\n      <form class=\"login__form\" action=\"#login\">\n        <label>\n          <span>Username:</span>\n          <input class=\"login__username\" type=\"text\" value=\"".concat(appState.loginInputValue || '', "\">\n        </label>\n        <button class=\"login__button\" type=\"submit\">Login</button>\n      </form>\n    </div>\n  ");
}
function renderChatInterface(appState) {
  if (!appState.userIsLoggedIn) return '';
  var messagesHtml = appState.messages.map(function (msg) {
    var isUserMessage = msg.username === appState.currentUser;
    return "\n      <div class=\"message\">\n        <span class=\"message__username\">".concat(msg.username, ":</span> ").concat(msg.message, "\n        ").concat(isUserMessage ? "<button class=\"message__delete\" data-id=\"".concat(msg.id, "\">Delete</button>") : '', "\n      </div>\n    ");
  }).join('');
  return "\n    <div class=\"chat-header\">\n      <h2 class=\"chat-header__title\">Chat Room</h2>\n      <button class=\"controls__logout\">Logout</button>\n    </div>\n    <div class=\"chat\">\n      <div class=\"user-list\">\n        <h3 class=\"user-list__title\">Online Users</h3>\n        <div class=\"user-list__content\">".concat(renderUserList(appState), "</div>\n      </div>\n      <div class=\"messages\">\n        <div class=\"messages__content\">").concat(messagesHtml, "</div>\n        ").concat(renderMessageInputForm(appState), "\n      </div>\n    </div>\n  ");
}
function renderUserList(appState) {
  if (!appState.users || appState.users.length === 0) {
    return '<div class="user__name">No users online</div>';
  }
  return appState.users.map(function (user) {
    return "\n    <div class=\"user__name\">\n      <span class=\"user__status\"></span> \n      ".concat(user, "\n    </div>\n  ");
  }).join('');
}
function renderControlButtons(appState) {
  return "\n    <div class=\"controls\">\n      <button class=\"controls__logout\">Logout</button>\n    </div>\n  ";
}
function renderMessageInputForm(appState) {
  return "\n    <form class=\"message__form\" action=\"#send\">\n      <label for=\"message__input\" class=\"message__label\">Type a message:</label>\n      <input id=\"message__input\" class=\"message__input\" type=\"text\" placeholder=\"Type a message...\" value=\"".concat(appState.messageInputValue || '', "\">\n      <button type=\"submit\" class=\"message__button\">Send</button>\n    </form>\n  ");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderView);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkUserSession: () => (/* binding */ checkUserSession),
/* harmony export */   getAllRegisteredUsers: () => (/* binding */ getAllRegisteredUsers),
/* harmony export */   getChatMessages: () => (/* binding */ getChatMessages),
/* harmony export */   getOnlineUsers: () => (/* binding */ getOnlineUsers),
/* harmony export */   loginUser: () => (/* binding */ loginUser),
/* harmony export */   logoutUser: () => (/* binding */ logoutUser),
/* harmony export */   removeChatMessage: () => (/* binding */ removeChatMessage),
/* harmony export */   sendChatMessage: () => (/* binding */ sendChatMessage)
/* harmony export */ });
function loginUser(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  }).then(handleResponse);
}
function logoutUser() {
  return fetch('/api/session', {
    method: 'DELETE'
  }).then(handleResponse);
}
function getChatMessages() {
  return fetch('/api/messages').then(handleResponse);
}
function sendChatMessage(message) {
  return fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message
    })
  }).then(handleResponse);
}
function checkUserSession() {
  return fetch('/api/session').then(handleResponse)["catch"](function (err) {
    if (err.error === 'auth-missing') {
      return Promise.reject({
        error: 'auth-missing'
      });
    }
    return Promise.reject(err);
  });
}
function getOnlineUsers() {
  return fetch('/api/users').then(handleResponse)["catch"](function (err) {
    var error = err.error || 'Failed to fetch users';
    return Promise.reject({
      error: error
    });
  });
}
function getAllRegisteredUsers() {
  return fetch('/api/allusers').then(handleResponse)["catch"](function (err) {
    var error = err.error || 'Failed to fetch all users';
    return Promise.reject({
      error: error
    });
  });
}
function removeChatMessage(id) {
  return fetch("/api/messages/".concat(id), {
    method: 'DELETE'
  }).then(handleResponse);
}
function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return response.json().then(function (err) {
    var error = err.error || 'Something went wrong';
    return Promise.reject({
      error: error
    });
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearError: () => (/* binding */ clearError),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setAllUsers: () => (/* binding */ setAllUsers),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setMessages: () => (/* binding */ setMessages),
/* harmony export */   setSession: () => (/* binding */ setSession),
/* harmony export */   setUsers: () => (/* binding */ setUsers),
/* harmony export */   startChatPending: () => (/* binding */ startChatPending),
/* harmony export */   startLoginPending: () => (/* binding */ startLoginPending)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_constants__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var appState = {
  messages: [],
  users: [],
  allUsers: [],
  userIsLoggedIn: false,
  loginInProgress: false,
  chatInProgress: false,
  errorMessage: '',
  currentUser: ''
};
function login(username) {
  appState.userIsLoggedIn = true;
  appState.loginInProgress = false;
  appState.currentUser = username;
  appState.errorMessage = '';
}
function logout() {
  appState.userIsLoggedIn = false;
  appState.loginInProgress = false;
  appState.currentUser = '';
  appState.messages = [];
  appState.users = [];
  appState.errorMessage = '';
}
function setMessages(newMessages) {
  appState.messages = newMessages;
  appState.chatInProgress = false;
  appState.errorMessage = '';
}
function setUsers(newUsers) {
  var activeUsers = new Set(newUsers);
  appState.users = appState.users.filter(function (user) {
    return activeUsers.has(user);
  });
  appState.users = _toConsumableArray(newUsers);
}
function setAllUsers(newAllUsers) {
  appState.allUsers = newAllUsers;
}
function setError(error) {
  appState.errorMessage = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
  appState.chatInProgress = false;
  appState.loginInProgress = false;
}
function startLoginPending() {
  appState.loginInProgress = true;
  appState.errorMessage = '';
}
function startChatPending() {
  appState.chatInProgress = true;
  appState.errorMessage = '';
}
function clearError() {
  appState.errorMessage = '';
}
function setSession(username) {
  appState.userIsLoggedIn = true;
  appState.currentUser = username;
  appState.loginInProgress = false;
  appState.errorMessage = '';
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appState);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var appEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
  appState: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.setupLoginHandler)({
  appState: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.setupLogoutHandler)({
  appState: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.setupMessageHandler)({
  appState: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.startMessagePolling)({
  appState: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.setupDeleteMessageHandler)({
  appState: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
checkForSession();
function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.checkUserSession)().then(function (session) {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.login)(session.username);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      appState: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
    return Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_1__.getChatMessages)(), (0,_services__WEBPACK_IMPORTED_MODULE_1__.getOnlineUsers)(), (0,_services__WEBPACK_IMPORTED_MODULE_1__.getAllRegisteredUsers)()]);
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === 'auth-missing') {
      return Promise.reject({
        error: 'noSession'
      });
    }
    return Promise.reject(err);
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
      messages = _ref2[0],
      users = _ref2[1],
      allUsers = _ref2[2];
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setMessages)(messages);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setUsers)(users);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setAllUsers)(allUsers);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      appState: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === 'noSession') {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        appState: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
        appEl: appEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      appState: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map