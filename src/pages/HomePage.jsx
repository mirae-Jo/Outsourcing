import React, {useState} from 'react';
import KakaoMap from 'components/Home/KakaoMap';
import Search from 'components/Home/Search';
import LoginModal from 'components/Login/LoginModal';

function HomePage() {
  const [isLoginModal, setIsLoginModal] = useState(true);

  return (
    <>
      {isLoginModal ? <LoginModal /> : null}
      <Search />
      <KakaoMap />
    </>
  );
}

export default HomePage;
