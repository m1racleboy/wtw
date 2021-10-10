import React, { useState } from 'react';
import PropTypes from 'prop-types';
import movieProp from '../../props/movie.prop';
import { useDispatch, useSelector } from 'react-redux';
import MovieCardScreen from '../movie-card-screen/movie-card-screen';
import { changeRenderedMoviesCount } from '../../store/reducers/movie-data';

export default function MovieListScreen(props) {
  const { movies } = props;
  const dispatch = useDispatch();
  const renderedMoviesCount = useSelector((state) => state.movie.renderedMoviesCount);
  const [activeMovie, setActiveMovie] = useState(null);

  const handleMouseEnter = (movieId) => setActiveMovie(movieId);
  const handleMouseLeave = () => setActiveMovie(null);
  const handleShowMoreClick = () => dispatch(changeRenderedMoviesCount());


  return (
    <>
      <div className="catalog__films-list">
        {movies.slice(0, renderedMoviesCount).map((movie) => <MovieCardScreen key={movie.id} movie={movie} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} isActive={activeMovie === movie.id} />)}
      </div>

      {renderedMoviesCount < movies.length &&
        <div className="catalog__more">
          <button className="catalog__button" type="button" onClick={handleShowMoreClick}>Show more</button>
        </div>}
    </>
  );
}

MovieListScreen.propTypes = {
  movies: PropTypes.arrayOf(movieProp).isRequired,
};
