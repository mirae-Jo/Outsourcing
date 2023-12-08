import React, {useEffect, useState} from 'react';
import KakaoMap from 'components/Home/KakaoMap';
import Search from 'components/Home/Search';
import LoginModal from 'components/Login/LoginModal';
import {onAuthStateChanged} from '@firebase/auth';
import {auth} from 'shared/firebase';
import RecommendList from 'components/Home/RecommendList';
import db from 'shared/firebase';
import {useDispatch} from 'react-redux';
import {login} from 'shared/redux/modules/authSlice';
function HomePage() {
  const [isLoginModal, setIsLoginModal] = useState(true);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    // 지도의 초기 위치
    center: {lat: 33.3766655632143, lng: 126.54222094512},
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  useEffect(() => {
    const currentauthUser = auth.currentUser;
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
  });

  const [searchAddress, setSearchAddress] = useState();

  return (
    <>
      <Search state={state} setState={setState} searchAddress={searchAddress} setSearchAddress={setSearchAddress} />
      <RecommendList />
      <KakaoMap state={state} setState={setState} />
    </>
  );
}

export default HomePage;
