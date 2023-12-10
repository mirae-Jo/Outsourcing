import React, {useEffect} from 'react';
import Search from 'components/Home/Search';
import {onAuthStateChanged} from '@firebase/auth';
import {auth} from 'shared/firebase';
import RecommendList from 'components/Home/RecommendList';
import db from 'shared/firebase';
import {useDispatch} from 'react-redux';
import {login} from 'shared/redux/modules/authSlice';
import Header from 'components/Layout/Header';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(
      auth,
      user => {
        console.log('user', user);
        //유저가 있으면 dispatch를 통해 유저 정보 넣어줌.
        if (user) {
          const {uid, displayName, photoURL} = user;
          dispatch(login({uid, displayName, photoURL}));
        }
        console.log('db', db);
        console.log('auth', auth);
      },
      [],
    );
  }, []); // 의존성 배열

  return (
    <>
      <Header />
      <Search />
      <RecommendList />
    </>
  );
}

export default HomePage;
