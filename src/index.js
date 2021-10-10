import React from 'react';
import ReactDOM from 'react-dom';
import { Router as BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import browserHistory from './browser-history';
import { createAPI } from './services/api';
import App from './components/app/app';
import rootReducer from './store/root-reducer';
import { checkAuth, fetchMovieList, fetchHeaderMovie } from './store/api-actions';
import { requireAuthorization } from './store/reducers/user-data';
import { AuthorizationStatus } from './const';

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
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
