import React, {useState} from 'react';
import KakaoMap from 'components/Home/KakaoMap';
import Search from 'components/Home/Search';
import LoginModal from 'components/Login/LoginModal';
import RecommendList from 'components/Home/RecommendList';

function HomePage() {
  const [isLoginModal, setIsLoginModal] = useState(true);

  const [state, setState] = useState({
    // 지도의 초기 위치
    center: {lat: 37.49676871972202, lng: 127.02474726969814},
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });

  return (
    <>
      {isLoginModal ? <LoginModal /> : null}
      <Search state={state} setState={setState} />
      <RecommendList />
      <KakaoMap state={state} setState={setState} />
    </>
  );
}

export default HomePage;
