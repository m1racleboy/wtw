import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store/action.js';

import movieProp from '../../props/movie.prop';

import { ALL_GENRES } from '../../const';

export function GenresList(props) {
  const { currentGenre, movies, onGenreTabClick } = props;
  const uniqueGenres = new Set(movies.map((movie) => movie.genre));

  return (
    <ul className="catalog__genres-list" onClick={onGenreTabClick}>
      {[ALL_GENRES, ...Array.from(uniqueGenres)].map((genre) => (
        <li key={genre} className={`catalog__genres-item ${currentGenre === genre ? 'catalog__genres-item--active' : ''}`}>
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
}

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
  movies: state.movies,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreTabClick(evt) {
    evt.preventDefault();
    if (evt.target.matches('a')) {
      dispatch(ActionCreator.changeCurrentGenre(evt.target.textContent));
      dispatch(ActionCreator.resetMoviesBoard());
    }
  },
});

GenresList.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(movieProp).isRequired,
  onGenreTabClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
