import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { actions } from './slices/index.js';
import socket from './socket.js';
import store from './store.js';

import App from './components/App';

const run = ({ channels, messages, currentChannelId }) => {
  store.dispatch(actions.addChannels({ channels }));
  store.dispatch(actions.addMessages({ messages }));
  store.dispatch(actions.setCurrentChannel({ currentChannelId }));

  socket.on('newChannel', ({ data: { attributes } }) => {
    store.dispatch(actions.addChannel({ channel: { ...attributes } }));
  });

  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(actions.removeChannel({ id }));
  });

  socket.on('renameChannel', ({ data: { attributes } }) => {
    store.dispatch(actions.renameChannel({ ...attributes }));
  });

  socket.on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(actions.addMessage({ message: { ...attributes } }));
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#chat'),
  );
};

export default run;