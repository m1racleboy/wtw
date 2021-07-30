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
    addReview(state, action) {
      state.reviews.push(action.payload);
    },
  },
});

export default reviewData.reducer;
export const { loadReviews, addReview } = reviewData.actions;
