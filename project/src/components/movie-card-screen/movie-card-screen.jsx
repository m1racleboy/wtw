import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MovieProp from '../../props/movie.prop';

import VideoPlayer from '../video-player/video-player';
import { fetchMovieReviews, fetchSimilarMovies } from '../../store/api-actions';
import { connect } from 'react-redux';

export function MovieCardScreen(props) {
  const { movie, onMouseEnter, onMouseLeave, isActive, onMovieClick } = props;
  const { id, title } = movie;
  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={() => onMouseLeave(null)}
    >
      <div className="small-film-card__image">
        <VideoPlayer movie={movie} isActive={isActive} />
      </div>
      <h3 className="small-film-card__title">
        <Link onClick={() => onMovieClick(id)} className="small-film-card__link" to={`/films/${id}`}>{title}</Link>
      </h3>
    </article>
  );
}

MovieCardScreen.propTypes = {
  movie: MovieProp,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onMovieClick(id) {
    dispatch(fetchMovieReviews(id));
    dispatch(fetchSimilarMovies(id));
  },
});

export default connect(null, mapDispatchToProps)(MovieCardScreen);
