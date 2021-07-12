import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieReviews } from '../../store/api-actions';

export default function DetailsTab(props) {
  const { id } = props;

  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchMovieReviews(id));
  }, [id]);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review, index) => index % 2 === 0
          ? (
            <React.Fragment key={review.id}>
              <div className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{review.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{review.user.name}</cite>
                    <time className="review__date" dateTime={`${dayjs(review.date).format('YYYY-MM-DD')}`}>{dayjs(review.date).format('MMMM DD, YYYY')}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{review.rating}</div>
              </div>
            </React.Fragment>
          )
          : '')}
      </div>
      <div className="film-card__reviews-col">
        {reviews.map((review, index) => index % 2 !== 0
          ? (
            <React.Fragment key={review.id}>
              <div className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{review.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{review.user.name}</cite>
                    <time className="review__date" dateTime={`${dayjs(review.date).format('YYYY-MM-DD')}`}>{dayjs(review.date).format('MMMM DD, YYYY')}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{review.rating}</div>
              </div>
            </React.Fragment>
          )
          : '')}
      </div>
    </div>
  );
}

DetailsTab.propTypes = {
  id: PropTypes.number.isRequired,
};
