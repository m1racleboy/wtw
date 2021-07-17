import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';

export const userData = createSlice({
  name: 'userData',
  initialState: {
    authorizationStatus: AuthorizationStatus.UNKNOWN,
    userData: {},
  },
  reducers: {
    requireAuthorization(state, action) {
      state.authorizationStatus = action.payload;
    },
    signOut(state) {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.userData = {};
    },
    loadUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export default userData.reducer;
export const { requireAuthorization, signOut, loadUserData } = userData.actions;
