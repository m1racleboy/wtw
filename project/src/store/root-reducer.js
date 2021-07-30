import { combineReducers } from 'redux';
import movieData from './reducers/movie-data';
import reviewData from './reducers/review-data';
import userData from './reducers/user-data';

export default combineReducers({
  movie: movieData,
  review: reviewData,
  user: userData,
});
