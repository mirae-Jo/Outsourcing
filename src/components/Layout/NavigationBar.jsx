import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import LoginModal from 'components/Login/LoginModal';
import {useLocation, useNavigate} from 'react-router';
import {auth} from 'shared/firebase';
import {onAuthStateChanged} from '@firebase/auth';
import {doc, getDoc} from '@firebase/firestore';
import db from 'shared/firebase';

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [userDisplayName, setUserDisplayName] = useState(null);
  const [userNickName, setUserNickName] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setUserDisplayName(user?.displayName || null);
      setUserNickName(user?.nickname || null);

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        console.log(user);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const avatarURL = userData.avatar;
          const userNickname = userData.nickname;
          const userPhotopURL = userData.photoURL;
          console.log(avatarURL);
          console.log(userPhotopURL);

          const googleProviderData = user.providerData.find(provider => provider.providerId === 'google.com');
          console.log(googleProviderData);

          if (googleProviderData) {
            setAvatarUrl(userData.photoURL);
          } else {
            setAvatarUrl(avatarURL);
          }

          setUserNickName(userNickname);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const goHomeBT = () => {
    navigate(`/`);
  };

  const clickOnProfile = () => {
    navigate(`/ProFilePage:id`);
  };

  return (
    <ScNavigationContainer>
      {isLoginModal ? <LoginModal /> : null}
      <ScHomeBT onClick={goHomeBT}>홈으로 </ScHomeBT>

      {(userDisplayName || userNickName) && <ScProfile onClick={clickOnProfile}>내 프로필 </ScProfile>}

      {(userDisplayName || userNickName) && (
        <ScLoginContext>
          {avatarUrl && <ScProfileIMG src={avatarUrl} alt="Avatar" />}
          <p>{`${userNickName || userDisplayName} 님 반갑습니다.`}</p>
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
  border: 3px solid white;
  object-fit: cover;
`;

export default NavigationBar;
