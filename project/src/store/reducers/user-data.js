import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';

export const userData = createSlice({
  name: 'userData',
  initialState: {
    authorizationStatus: AuthorizationStatus.UNKNOWN,
  },
  reducers: {
    requireAuthorization(state, action) {
      state.authorizationStatus = action.payload;
    },
    signOut(state) {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    },
  },
});

export default userData.reducer;
export const { requireAuthorization, signOut } = userData.actions;
