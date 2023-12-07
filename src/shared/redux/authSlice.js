import {createSlice} from '@reduxjs/toolkit';

const authslice = createSlice({
  name: 'user_auth',
  initialState: {
    isloggined: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.isloggined = false;
      state.user = null;
    },
  },
});

export const {login, logout} = authslice.actions;

export default authslice.reducer;
