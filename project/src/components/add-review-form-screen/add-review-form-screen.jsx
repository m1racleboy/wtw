import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { postReview } from '../../store/api-actions';
import { useInput } from '../../hooks/useInput';

const COMMENT_MIN_LENGTH = 50;
const COMMENT_MAX_LENGTH = 400;
const STARS_LENGTH = 10;
export function AddReviewFormScreen(props) {
  const { onSubmit } = props;
  const { id } = useParams();

  const rating = useInput(null, { isEmpty: true });
  const comment = useInput('', { isEmpty: true, minLength: COMMENT_MIN_LENGTH, maxLength: COMMENT_MAX_LENGTH });

  const state = {
    id: id,
    comment: comment.value,
    rating: rating.value,
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(state);
  };

  const stars = Array.from({ length: STARS_LENGTH }, (v, i) => i + 1).reverse();

  const createStarsTemplate = (starValue) => (
    <React.Fragment key={starValue}>
      <input
        className="rating__input"
        id={`star-${starValue}`}
        type="radio" name="rating"
        value={starValue}
        onChange={(e) => rating.onChange(e)}
        onBlur={(e) => rating.onBlur(e)}
      />
      <label className="rating__label" htmlFor={`star-${starValue}`}>Rating {starValue}</label>
    </React.Fragment>
  );

  return (
    <div className="add-review">
      <form onSubmit={handleSubmit} action="#" className="add-review__form">
        <div className="rating" style={{ display: 'flex', flexDirection: 'column' }}>
          {rating.isEmpty && <div style={{ color: 'black', margin: '0 auto' }}>Укажите рейтинг фильма</div>}
          <div className="rating__stars">
            {stars.map((starValue) => createStarsTemplate(starValue))}
          </div>
        </div>
        <div className="add-review__text">
          {(comment.isDirty && comment.isEmpty) && <div style={{ color: 'black' }}>Комментарий не может быть пустым</div>}
          {(comment.isDirty && comment.minLengthError) && <div style={{ color: 'black' }}>Слишком короткий комментарий, осталось: {COMMENT_MIN_LENGTH - comment.value.length}</div>}
          {(comment.isDirty && comment.maxLengthError) && <div style={{ color: 'black' }}>Слишком длинный комментарий, превышен на: {COMMENT_MAX_LENGTH - comment.value.length}</div>}

          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={comment.value}
            onChange={(e) => comment.onChange(e)}
            onBlur={(e) => comment.onBlur(e)}
          >
          </textarea>
          <div className="add-review__submit">
            <button disabled={!rating.inputValid || !comment.inputValid} className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div >
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
