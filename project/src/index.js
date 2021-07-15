import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from './services/api';
import { Provider } from 'react-redux';
import rootReducer from './store/root-reducer';
import App from './components/app/app';

import { checkAuth, fetchMovieList, fetchHeaderMovie } from './store/api-actions';
import { AuthorizationStatus } from './const';
import { requireAuthorization } from './store/reducers/user-data';

const api = createAPI(() => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(checkAuth());
store.dispatch(fetchMovieList());
store.dispatch(fetchHeaderMovie());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
