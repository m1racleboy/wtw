import React, { useState } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import movieProp from '../../props/movie.prop';

import MovieCardScreen from '../movie-card-screen/movie-card-screen';
import { ActionCreator } from '../../store/action';

export function MovieListScreen(props) {
  const { movies, renderedMoviesCount, onMoviesCountStepChange } = props;
  const [activeMovie, setActiveMovie] = useState(null);

  const handleMouseEnter = (movieId) => setActiveMovie(movieId);
  const handleMouseLeave = () => setActiveMovie(null);
  const handleShowMoreClick = () => onMoviesCountStepChange();


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

const mapStateToProps = (state) => ({
  renderedMoviesCount: state.renderedMoviesCount,
});

const mapDispatchToProps = (dispatch) => ({
  onMoviesCountStepChange() {
    dispatch(ActionCreator.moviesCountStep());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieListScreen);

MovieListScreen.propTypes = {
  movies: PropTypes.arrayOf(movieProp).isRequired,
  renderedMoviesCount: PropTypes.number.isRequired,
  onMoviesCountStepChange: PropTypes.func.isRequired,
};
