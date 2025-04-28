import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure, 
    logout 
} = authSlice.actions;

export default authSlice.reducer;
