import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Settings = {
  START_COUNT_MOVIES: 8,
};

const headerMovie = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: 2014,
  movieLink: 'film-page.html',
  backgroundImage: 'img/bg-the-grand-budapest-hotel.jpg',
  poster: 'img/the-grand-budapest-hotel-poster.jpg',
  preview: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
};

const movie = {
  title: 'Fantastic Beasts: The Crimes of Grindelwald',
  movieLink: 'film-page.html',
  preview: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
};

const movies = [];

for (let i = 0; i < Settings.START_COUNT_MOVIES; i++) {
  movies[i] = movie;
}

ReactDOM.render(
  <React.StrictMode>
    <App headerMovie={headerMovie} movies={movies} />
  </React.StrictMode>,
  document.getElementById('root'));
