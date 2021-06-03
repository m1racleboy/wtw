import React from 'react';
import PropTypes from 'prop-types';

export default function MovieCard({ movie }) {
  const { title, movieLink, preview } = movie;

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={preview} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={movieLink}>{title}</a>
      </h3>
    </article>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    movieLink: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
};