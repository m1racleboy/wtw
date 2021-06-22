import React from 'react';

import MovieProp from '../movie-card-screen/movie.prop';

const ratingMap = new Map();

ratingMap.set({
  from: 0,
  to: 3,
}, 'Bad');

ratingMap.set({
  from: 3,
  to: 5,
}, 'Normal');

ratingMap.set({
  from: 5,
  to: 8,
}, 'Good');

ratingMap.set({
  from: 8,
  to: 9.9,
}, 'Very good');

ratingMap.set({
  from: 10,
  to: 10,
}, 'Awesome');

export const getRatingLevel = (rating) => {

  for (const value of ratingMap) {
    if (rating >= value[0].from && rating <= value[0].to) {
      return value[1];
    }
  }
};

export default function OverviewTab(props) {
  const { movie } = props;

  const {
    rating,
    scoresCount,
    description,
    director,
    starring,
  } = movie;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingLevel(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')}</strong></p>
      </div>
    </>
  );
}

OverviewTab.propTypes = {
  movie: MovieProp,
};
