import { createSlice } from '@reduxjs/toolkit';

export const reviewData = createSlice({
  name: 'reviewData',
  initialState: {
    reviews: [],
  },
  reducers: {
    loadReviews(state, action) {
      state.reviews = [...action.payload];
    },
    postReview(state, action) {
      state.reviews.push(action.payload);
    },
  },
});

export default reviewData.reducer;
export const { loadReviews, postReview } = reviewData.actions;
