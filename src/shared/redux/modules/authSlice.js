import { createSlice } from '@reduxjs/toolkit';

const authslice = createSlice({
  name: 'user_auth',
  initialState: {
    isloggined: localStorage.getItem('uid') ? true : false,
    user: {
      uid: localStorage.getItem('uid'),
      displayName: localStorage.getItem('displayName'),
      photoURL: localStorage.getItem('photoURL'),
    },
  },
  reducers: {
    login: (state, action) => {
      state.isloggined = true;
      let { uid, displayName, photoURL } = action.payload;
      if (!displayName && !photoURL) {
        displayName = localStorage.getItem('displayName', displayName);
        photoURL = localStorage.getItem('photoURL', photoURL);
      }
      localStorage.setItem('uid', uid);
      localStorage.setItem('displayName', displayName);
      localStorage.setItem('photoURL', photoURL);
      state.user = { uid, displayName, photoURL };
      console.log('displayName', displayName, 'photoURL', photoURL);
    },
    logout: (state, action) => {
      state.isloggined = false;
      state.user.uid = null;
      state.user.displayName = null;
      state.user.photoURL = null;
      localStorage.removeItem('uid');
      localStorage.removeItem('displayName');
      localStorage.removeItem('photoURL');
    },
    userUpdate: (state, action) => {
      const { displayName, photoURL } = action.payload;
      state.user.displayName = displayName;
      state.user.photoURL = photoURL;
      localStorage.setItem('displayName', displayName);
      localStorage.setItem('photoURL', photoURL);
    },
    userProfileUpdate: (state, action) => {
      let { displayName, photoURL } = action.payload;
      if (displayName) {
        state.user.displayName = displayName;
        localStorage.setItem('displayName', displayName);
      }
      if (photoURL) {
        state.user.photoURL = photoURL;
        localStorage.setItem('photoURL', photoURL);
      }
    }
  },
});

export const { login, logout, userUpdate, userProfileUpdate } = authslice.actions;

export default authslice.reducer;
