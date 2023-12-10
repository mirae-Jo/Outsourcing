import React, {useEffect} from 'react';
import Search from 'components/Home/Search';
import {onAuthStateChanged} from '@firebase/auth';
import {auth} from 'shared/firebase';
import RecommendList from 'components/Home/RecommendList';
import {useDispatch} from 'react-redux';
import {login} from 'shared/redux/modules/authSlice';
import Header from 'components/Layout/Header';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      //유저가 있으면 dispatch를 통해 유저 정보 넣어줌.
      if (user) {
        const {uid, displayName, photoURL} = user;
        dispatch(login({uid, displayName, photoURL}));
      }
    });
  }, [dispatch]);

  return (
    <>
      <Header />
      <Search />
      <RecommendList />
    </>
  );
}

export default HomePage;
