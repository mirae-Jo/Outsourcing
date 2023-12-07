import React, {useEffect, useState} from 'react';
import KakaoMap from 'components/Home/KakaoMap';
import Search from 'components/Home/Search';
import LoginModal from 'components/Login/LoginModal';
import {onAuthStateChanged} from '@firebase/auth';
import {auth} from 'shared/firebase';

function HomePage() {
  useEffect(() => {
    const currentauthUser = auth.currentUser;
    onAuthStateChanged(
      auth,
      user => {
        console.log('user', user);
      },
      [],
    );
  });
  return (
    <>
      <Search />
      <KakaoMap />
    </>
  );
}

export default HomePage;
