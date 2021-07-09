import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { postReview } from '../../store/api-actions';
import { useInput } from '../../hooks/useInput';

const COMMENT_MIN_LENGTH = 50;
const COMMENT_MAX_LENGTH = 400;
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

  return (
    <div className="add-review">
      <form onSubmit={handleSubmit} action="#" className="add-review__form">
        <div className="rating" style={{ display: 'flex', 'flex-direction': 'column' }}>
          {rating.isEmpty && <div style={{ color: 'black', margin: '0 auto' }}>Укажите рейтинг фильма</div>}
          <div className="rating__stars">
            <input className="rating__input" id="star-10" type="radio" name="rating" value="10"
              onChange={(e) => rating.onChange(e)}
              onBlur={(e) => rating.onBlur(e)}
            />
            <label className="rating__label" htmlFor="star-10">Rating 10</label>

            <input className="rating__input" id="star-9" type="radio" name="rating" value="9"
              onChange={(e) => rating.onChange(e)}
              onBlur={(e) => rating.onBlur(e)}
            />
            <label className="rating__label" htmlFor="star-9">Rating 9</label>

            <input className="rating__input" id="star-8" type="radio" name="rating" value="8"
              onChange={(e) => rating.onChange(e)}
              onBlur={(e) => rating.onBlur(e)}
            />
            <label className="rating__label" htmlFor="star-8">Rating 8</label>

            <input className="rating__input" id="star-7" type="radio" name="rating" value="7"
              onChange={(e) => rating.onChange(e)}
              onBlur={(e) => rating.onBlur(e)}
            />
            <label className="rating__label" htmlFor="star-7">Rating 7</label>

            <input className="rating__input" id="star-6" type="radio" name="rating" value="6"
              onChange={(e) => rating.onChange(e)}
              onBlur={(e) => rating.onBlur(e)}
            />
            <label className="rating__label" htmlFor="star-6">Rating 6</label>

            <input className="rating__input" id="star-5" type="radio" name="rating" value="5"
              onChange={(e) => rating.onChange(e)}
              onBlur={(e) => rating.onBlur(e)}
            />
            <label className="rating__label" htmlFor="star-5">Rating 5</label>

            <input className="rating__input" id="star-4" type="radio" name="rating" value="4"
              onChange={(e) => rating.onChange(e)}
              onBlur={(e) => rating.onBlur(e)}
            />
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input className="rating__input" id="star-3" type="radio" name="rating" value="3"
              onChange={(e) => rating.onChange(e)}
              onBlur={(e) => rating.onBlur(e)}
            />
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input className="rating__input" id="star-2" type="radio" name="rating" value="2"
              onChange={(e) => rating.onChange(e)}
              onBlur={(e) => rating.onBlur(e)}
            />
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input className="rating__input" id="star-1" type="radio" name="rating" value="1"
              onChange={(e) => rating.onChange(e)}
              onBlur={(e) => rating.onBlur(e)}
            />
            <label className="rating__label" htmlFor="star-1">Rating 1</label>
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
