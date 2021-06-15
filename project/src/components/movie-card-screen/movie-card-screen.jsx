import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MovieProp from './movie-card.prop';

export default function MovieCardScreen({ movie, onMouseEnter, onMouseLeave, active }) {
  const { id, title, poster } = movie;
  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={() => onMouseLeave(null)}
    >
      <div className="small-film-card__image">
        <img src={poster} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{title}</Link>
      </h3>
    </article>
  );
}

MovieCardScreen.propTypes = {
  movie: MovieProp,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};
