import React from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import PropTypes from 'prop-types';
export default function App({ headerMovie, movies }) {
  return (
    <WelcomeScreen headerMovie={headerMovie} movies={movies} />
  );
}

App.propTypes = {
  headerMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      movieLink: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired,
    })).isRequired,
};
