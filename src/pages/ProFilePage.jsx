import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {doc, getDoc, updateDoc, setDoc} from '@firebase/firestore';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import {auth} from 'shared/firebase';
import db from 'shared/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import {storage} from 'shared/firebase';
export const ProFilePage = () => {
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [newProfileImage, setNewProfileImage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log('user', user);

      // user 객체가 정의된 경우에만 fetchUserData 호출
      if (user) {
        fetchUserData(user);
      }
    });

    // useEffect 정리 함수에서 구독 해제
    return () => unsubscribe();
  }, []); // 빈 배열을 전달하여 최초 한 번만 실행되도록 설정

  const fetchUserData = async user => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      setNickname(userData.nickName);
      setProfileImage(userData.avatar);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async user => {
    const userDocRef = doc(db, 'users', user.uid);

    // Firestore에 사용자 데이터가 있는지 확인
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // 이미 데이터가 있는 경우 업데이트
      await updateDoc(userDocRef, {
        nickName: newNickname || nickname,
        // Google 로그인 사용자는 photoURL로, 일반 사용자는 avatar로 업데이트
        photoURL:
          auth.currentUser.providerData[0]?.providerId === 'google.com' ? newProfileImage || profileImage : null,
        avatar: auth.currentUser.providerData[0]?.providerId === 'google.com' ? null : newProfileImage || profileImage,
      });
    } else {
      // 데이터가 없는 경우 새로운 문서를 만들어 저장
      const userData = {
        uid: auth.currentUser.uid,
        nickName: newNickname || nickname,
        // Google 로그인 사용자는 photoURL로, 일반 사용자는 avatar로 설정
        photoURL:
          auth.currentUser.providerData[0]?.providerId === 'google.com' ? newProfileImage || profileImage : null,
        avatar: auth.currentUser.providerData[0]?.providerId === 'google.com' ? null : newProfileImage || profileImage,
        // provider 정보 추가
        provider: auth.currentUser.providerData[0]?.providerId,
      };
      await setDoc(userDocRef, userData);
    }

    setNickname(newNickname || nickname);
    setProfileImage(newProfileImage || profileImage);
    setIsEditMode(false);
  };
  const handleImageUpload = async file => {
    try {
      const storageRef = ref(storage, `images/${auth.currentUser.uid}/${file.name}`);
      await uploadBytes(storageRef, file);

      // 업로드된 이미지의 다운로드 URL을 얻어온다.
      const downloadURL = await getDownloadURL(storageRef);

      // Firestore에 사용자 데이터가 있는지 확인
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // 이미 데이터가 있는 경우 업데이트
        const userData = userDocSnapshot.data();

        if (userData.provider === 'google') {
          // Google 로그인 사용자는 photoURL로 업데이트
          await updateDoc(userDocRef, {
            nickName: newNickname || nickname,
            photoURL: downloadURL,
          });
        } else {
          // 일반 사용자는 avatar로 업데이트
          await updateDoc(userDocRef, {
            nickName: newNickname || nickname,
            avatar: downloadURL,
          });
        }
      } else {
        // 데이터가 없는 경우 새로운 문서를 만들어 저장
        const userData = {
          uid: auth.currentUser.uid,
          nickName: newNickname || nickname,
          // Google 로그인인 경우 photoURL로, 일반 사용자인 경우 avatar로 설정
          photoURL: auth.currentUser.providerData[0]?.providerId === 'google.com' ? downloadURL : null,
          avatar: auth.currentUser.providerData[0]?.providerId === 'google.com' ? null : downloadURL,
          // provider 정보 추가
          provider: auth.currentUser.providerData[0]?.providerId,
        };
        await setDoc(userDocRef, userData);
      }

      // 다운로드 URL을 state에 저장
      setProfileImage(downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  // 파일 input에서 이미지를 선택하면 호출되는 함수
  const handleImageSelect = event => {
    const file = event.target.files[0];

    if (file) {
      handleImageUpload(file);
    }
  };
  return (
    <Container>
      <h1>프로필 페이지</h1>
      <ProfileContainer>
        <ProfileImage src={isEditMode ? newProfileImage || profileImage : profileImage} alt="프로필" />
        <Nickname>{isEditMode ? newNickname || nickname : nickname}</Nickname>
      </ProfileContainer>

      {isEditMode ? (
        <EditForm>
          <label>새 닉네임</label>
          <input type="text" value={newNickname} onChange={e => setNewNickname(e.target.value)} />

          <label>새 프로필 이미지</label>
          <input type="file" onChange={handleImageSelect} accept="image/*" />

          <SaveButton onClick={() => handleSaveClick(auth.currentUser)}>저장</SaveButton>
        </EditForm>
      ) : (
        <EditButton onClick={handleEditClick}>프로필 편집</EditButton>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const ProfileContainer = styled.div`
  margin-top: 20px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const Nickname = styled.h2`
  margin-top: 10px;
`;

const EditForm = styled.form`
  margin-top: 20px;
  text-align: left;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
  }
`;

const SaveButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const EditButton = styled.button`
  background-color: #008cba;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #007aa7;
  }
`;
