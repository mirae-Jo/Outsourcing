import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginModal from 'components/Login/LoginModal';
import { useLocation, useNavigate } from 'react-router';
import { auth } from 'shared/firebase';
import { onAuthStateChanged } from '@firebase/auth';
import { doc, getDoc } from '@firebase/firestore';
import db from 'shared/firebase';
import loopy from '../../assets/imgs/loopy.jpeg';
import { useSelector } from 'react-redux';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { displayName, photoURL } = useSelector((state) => state.user_auth).user;
  console.log(displayName, photoURL);
  const [isLoginModal, setIsLoginModal] = useState(true);
  // const [userDisplayName, setUserDisplayName] = useState(null);
  const [userNickName, setUserNickName] = useState(displayName);
  const [avatarUrl, setAvatarUrl] = useState(photoURL);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        console.log(user);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const avatarURL = userData.avatar;
          const userNickname = userData.nickname;
          const userPhotopURL = userData.photoURL;

          const googleProviderData = user.providerData.find(provider => provider.providerId === 'google.com');

          if (googleProviderData) {
            setAvatarUrl(userData.photoURL);
          } else {
            setAvatarUrl(avatarURL);
          }

          setUserNickName(userNickName);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    //닉네임만 변경하면 사진이 undefined로 변경됨. 
    if (displayName !== userNickName) setUserNickName(displayName);
    if (photoURL !== avatarUrl) setAvatarUrl(photoURL);
  }, [displayName, photoURL])

  const goHomeBT = () => {
    navigate(`/`);
  };

  const clickOnProfile = () => {
    navigate(`/ProFilePage:id`);
  };
  const clickLoginModal = () => {
    setIsLoginModal(true);
  };
  return (
    <ScNavigationContainer>
      {isLoginModal ? <LoginModal /> : null}
      <ScHomeBT onClick={goHomeBT}>홈으로 </ScHomeBT>

      {userNickName && <ScProfile onClick={clickOnProfile}>내 프로필 </ScProfile>}
      {!userNickName && (
        <ScNotLoginComment onClick={clickLoginModal}>로그인이 아닙니다 로그인 하시겠습니까?</ScNotLoginComment>
      )}
      {userNickName && (
        <ScLoginContext>
          {avatarUrl && <ScProfileIMG src={avatarUrl} alt="Avatar" />}
          <p>{`${userNickName} 님 반갑습니다.`}</p>
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
  width: 50px;
  height: 30px;
  object-fit: cover;
  border-width: medium;
  background-image: url(${loopy});
  background-size: cover;
  background-position: center;
  color: transparent;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const ScNavigationContainer = styled.div`
  height: 50px;
  color: white;
  background-color: white;
  border-bottom: 3px solid black;
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

  border: 1px solid black;
  border-width: medium;
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
  color: black;
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
  border: 3px solid black;
  object-fit: cover;
`;
const ScNotLoginComment = styled.p`
  margin-top: 20px;
  margin-right: 10px;
  float: right;
  color: black;
`;
export default NavigationBar;
