import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { movies } from './mocks/movie';

ReactDOM.render(
  <React.StrictMode>
    <App headerMovie={movies[0]} movies={movies} />
  </React.StrictMode>,
  document.getElementById('root'));
