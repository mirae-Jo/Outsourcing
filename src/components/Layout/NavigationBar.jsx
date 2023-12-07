import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import LoginModal from 'components/Login/LoginModal';
import {useNavigate} from 'react-router';
import {auth} from 'shared/firebase';
import {onAuthStateChanged} from '@firebase/auth';
import {doc, getDoc} from '@firebase/firestore';
import db from 'shared/firebase';
const NavigationBar = () => {
  const navigate = useNavigate();
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [userDisplayName, setUserDisplayName] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    // 인증 상태가 변경될 때마다 호출되는 콜백 함수 등록
    const unsubscribe = onAuthStateChanged(auth, async user => {
      // user가 null이면 로그아웃 상태
      // user가 값이 있으면 로그인 상태
      setUserDisplayName(user?.displayName || null);

      if (user) {
        // Firestore에서 사용자 정보 가져오기
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        console.log(userDocSnapshot);
        if (userDocSnapshot.exists()) {
          // 사용자 정보가 있으면 avatar URL 가져오기
          setAvatarUrl(userDocSnapshot.data().avartar || null);
        }
      }
    });

    // 컴포넌트가 언마운트될 때 cleanup
    return () => unsubscribe();
  }, []);

  const goHomeBT = () => {
    navigate(`/`);
  };

  const clickOnProfile = () => {};

  return (
    <ScNavigationContainer>
      {isLoginModal ? <LoginModal /> : null}
      <ScHomeBT onClick={goHomeBT}>홈으로 </ScHomeBT>
      <ScProfile onClick={clickOnProfile}>내 프로필 </ScProfile>
      {userDisplayName ? (
        <ScLoginContext>
          {avatarUrl && <ScProfileIMG src={avatarUrl} alt="Avatar" />}
          <p>{userDisplayName} 님 반갑습니다.</p>
        </ScLoginContext>
      ) : (
        <ScLoginContext>
          <p>로그인 상태가 아닙니다. 로그인 하시겠습니까?</p>
        </ScLoginContext>
      )}
    </ScNavigationContainer>
  );
};

const ScHomeBT = styled.button`
  border-radius: 5px;
  background-color: #ffffff;
  float: left;
  margin-top: 10px;
  margin-left: 15px;
  font-weight: bold;
  width: 100px;
  height: 30px;
  &:hover {
    background-color: #ddd;
  }
`;

const ScNavigationContainer = styled.div`
  height: 50px;

  color: white;
  background-color: #1b9c85;
  p {
    font-weight: bold;
  }
`;

const ScProfile = styled.button`
  border-radius: 5px;
  background-color: #ffffff;
  float: right;
  margin-top: 10px;
  margin-right: 10px;
  font-weight: bold;
  width: 100px;
  height: 30px;
  padding: 5px;
  &:hover {
    background-color: #ddd;
  }
`;
const ScLoginContext = styled.div`
  float: right;
  margin-right: 10px;
  height: 40px;
  display: flex;
  align-items: center;
  p {
    margin-top: 10px;
  }
`;
const ScProfileIMG = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 50%;
`;
export default NavigationBar;
