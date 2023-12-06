import KakaoMap from 'components/Home/KakaoMap';
import React, {useState} from 'react';
import LoginModal from 'components/Login/LoginModal';
import SignUpModal from 'components/Login/SignUpModal';

function HomePage() {
  const [isLoginModal, setIsLoginModal] = useState(true);

  return (
    <>
      {isLoginModal ? <LoginModal /> : null}

      <KakaoMap />
    </>
  );
}

export default HomePage;
