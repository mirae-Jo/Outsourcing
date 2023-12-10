import {configureStore} from '@reduxjs/toolkit';
import user_auth from '../modules/authSlice';
import comments from '../modules/commentSlice';
import storage from 'redux-persist/lib/storage';

const store = configureStore({
  reducer: {
    user_auth,
    comments,
    storage,
  },
});

export default store;
