import { createSlice } from '@reduxjs/toolkit';
import defaultUserImg from 'assets/imgs/profilenormal.jpg';
import { auth, getUserInfo } from 'shared/firebase';



const authslice = createSlice({
  name: 'user_auth',
  initialState: {
    isloggined: localStorage.getItem('uid') ? true : false,
    user: {
      uid: localStorage.getItem('uid'),
      displayName: localStorage.getItem('displayName'),
      photoURL: localStorage.getItem('photoURL')
    },
  },
  reducers: {
    login: (state, action) => {
      console.log('로그인 중이니 로그인할게');
      state.isloggined = true;
      let { uid, displayName, photoURL } = action.payload;
      console.log(action.payload)
      localStorage.setItem('uid', uid);
      localStorage.setItem('displayName', displayName);
      localStorage.setItem('photoURL', photoURL);
      state.user = { uid, displayName, photoURL };
      console.log(state.user);
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
  },
});


export const { login, logout } = authslice.actions;

export default authslice.reducer;
