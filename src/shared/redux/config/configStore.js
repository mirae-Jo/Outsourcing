import {configureStore} from '@reduxjs/toolkit';
import user_auth from '../modules/authSlice';
import comments from '../modules/commentSlice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
const store = configureStore({
  reducer: {
    user_auth,
    comments,
    storage,
  },
});

export default store;
