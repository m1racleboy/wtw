import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { postReview } from '../../store/api-actions';

export function AddReviewFormScreen(props) {
  const { onSubmit } = props;
  const { id } = useParams();

  const [userReview, setUserReview] = useState({
    rating: 0,
    comment: '',
  });

  const state = {
    id: id,
    comment: userReview.comment,
    rating: userReview.rating,
  };

  const handleChangeReviewText = (evt) => {
    setUserReview((prevState) => ({
      ...prevState,
      comment: evt.target.value,
    }));
  };

  const handleChangeRating = (evt) => {
    setUserReview((prevState) => ({
      ...prevState,
      rating: evt.target.value,
    }));
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(state);
  };

  return (
    <div className="add-review">
      <form onSubmit={handleSubmit} action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            <input className="rating__input" id="star-10" type="radio" name="rating" value="10" onChange={handleChangeRating} />
            <label className="rating__label" htmlFor="star-10">Rating 10</label>

            <input className="rating__input" id="star-9" type="radio" name="rating" value="9" onChange={handleChangeRating} />
            <label className="rating__label" htmlFor="star-9">Rating 9</label>

            <input className="rating__input" id="star-8" type="radio" name="rating" value="8" onChange={handleChangeRating} />
            <label className="rating__label" htmlFor="star-8">Rating 8</label>

            <input className="rating__input" id="star-7" type="radio" name="rating" value="7" onChange={handleChangeRating} />
            <label className="rating__label" htmlFor="star-7">Rating 7</label>

            <input className="rating__input" id="star-6" type="radio" name="rating" value="6" onChange={handleChangeRating} />
            <label className="rating__label" htmlFor="star-6">Rating 6</label>

            <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onChange={handleChangeRating} />
            <label className="rating__label" htmlFor="star-5">Rating 5</label>

            <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onChange={handleChangeRating} />
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onChange={handleChangeRating} />
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onChange={handleChangeRating} />
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onChange={handleChangeRating} />
            <label className="rating__label" htmlFor="star-1">Rating 1</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={userReview.comment}
            onChange={handleChangeReviewText}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

AddReviewFormScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(state) {
    dispatch(postReview(state));
  },
});

export default connect(null, mapDispatchToProps)(AddReviewFormScreen);
