import React from 'react';
import ReactDOM from 'react-dom';

import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { movies } from './mocks/movie';
import { reviews } from './mocks/reviews';

import { reducer } from './store/reducer';

import App from './components/app/app';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App movies={movies} reviews={reviews} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
