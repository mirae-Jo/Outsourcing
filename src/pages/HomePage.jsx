import React, {useState} from 'react';
import KakaoMap from 'components/Home/KakaoMap';
import Search from 'components/Home/Search';
import LoginModal from 'components/Login/LoginModal';
import RecommendList from 'components/Home/RecommendList';

function HomePage() {
  const [isLoginModal, setIsLoginModal] = useState(true);

  return (
    <>
      {isLoginModal ? <LoginModal /> : null}
      <Search />
      <RecommendList />
      <KakaoMap />
    </>
  );
}

export default HomePage;
