import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MovieCardScreen from '../movie-card-screen/movie-card-screen';

export default function MovieListScreen(props) {
  const { movies } = props;
  const [activeMovie, setActiveMovie] = useState(null);

  const handleMouseEnter = (movieId) => setActiveMovie(movieId);
  const handleMouseLeave = () => setActiveMovie(null);

  return (
    <div className="catalog__films-list">
      {movies.map((movie) => <MovieCardScreen key={movie.id} movie={movie} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} isActive={activeMovie===movie.id}/>)}
    </div>
  );
}

MovieListScreen.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })).isRequired,
};
