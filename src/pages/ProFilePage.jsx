import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {doc, getDoc, updateDoc, setDoc} from '@firebase/firestore';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {auth} from 'shared/firebase';
import db from 'shared/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import {storage} from 'shared/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {userProfileUpdate} from 'shared/redux/modules/authSlice';
import {useNavigate} from 'react-router';
export const ProFilePage = () => {
  const {user} = useSelector(state => state.user_auth);
  const [nickname, setNickname] = useState(user.displayName);
  const [profileImage, setProfileImage] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [newProfileImage, setNewProfileImage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigater = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      // user 객체가 정의된 경우에만 fetchUserData 호출
      if (user) {
        fetchUserData(user);
      }
    });

    // useEffect 정리 함수에서 구독 해제
    return () => unsubscribe();
  }, []); // 빈 배열을 전달하여 최초 한 번만 실행되도록 설정

  useEffect(() => {
    setNickname(user.displayName);
  }, [user.displayName]);

  const fetchUserData = async user => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      setNickname(userData.nickname);

      // 사용자가 구글 로그인 사용자인 경우 photoURL을 가져옴
      setProfileImage(
        auth.currentUser.providerData[0]?.providerId === 'google.com' ? userData.photoURL : userData.avatar,
      );
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  // 이미지 업로드
  const handleImageUpload = async file => {
    try {
      const storageRef = ref(storage, `images/${auth.currentUser.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      console.log('Upload successful:', file.name);
      const downloadURL = await getDownloadURL(storageRef);

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // 이미 데이터가 있는 경우 업데이트
        await updateDoc(userDocRef, {
          nickname: newNickname,
          // Google 로그인 사용자와 일반 사용자 모두 프로필 이미지 URL 업데이트
          photoURL: downloadURL,
          avatar: downloadURL,
        });

        // 저장 버튼이 클릭될 때만 Blob URL을 생성하도록 수정
        setProfileImage(downloadURL);
      } else {
        // 데이터가 없는 경우 새로운 문서를 만들어 저장
        const userData = {
          uid: auth.currentUser.uid,
          nickname: newNickname || nickname,
          // Google 로그인 사용자와 일반 사용자 모두 프로필 이미지 URL 설정
          photoURL: downloadURL,
          avatar: downloadURL,
          provider: auth.currentUser.providerData[0]?.providerId,
        };
        await setDoc(userDocRef, userData);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // 저장 버튼 클릭 핸들러
  const handleSaveClick = async (event, user) => {
    // 기본 동작(새로고침) 막기
    event.preventDefault();
    // 변경된 내용이 있는지 확인
    const hasChanges = newNickname !== nickname || (newProfileImage && newProfileImage !== profileImage);
    navigater('/');
    // 변경된 내용이 없는 경우에는 확인 메시지 없이 종료
    if (!hasChanges || !window.confirm('수정하시겠습니까?')) {
      setIsEditMode(false);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    // Firestore에 사용자 데이터가 있는지 확인
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      await updateDoc(userDocRef, {
        nickname: newNickname !== '' ? newNickname : nickname,
        // Google 로그인 사용자와 일반 사용자 모두 프로필 이미지 업데이트
        photoURL: newProfileImage || profileImage,
        avatar: newProfileImage || profileImage,
      });
      dispatch(userProfileUpdate({displayName: newNickname, photoURL: newProfileImage}));
    } else {
      const userData = {
        uid: auth.currentUser.uid,
        nickname: newNickname || nickname,
        // Google 로그인 사용자와 일반 사용자 모두 프로필 이미지 설정
        photoURL: newProfileImage || profileImage,
        avatar: newProfileImage || profileImage,
        provider: auth.currentUser.providerData[0]?.providerId,
      };
      await setDoc(userDocRef, userData);
    }

    setNickname(newNickname || nickname);
    setNewProfileImage(newProfileImage || profileImage);
    setIsEditMode(false);
  };
  // 파일 input에서 이미지를 선택하면 호출되는 함수
  const handleImageSelect = event => {
    const file = event.target.files[0];

    if (file) {
      try {
        // 이미지를 Firebase Storage에 업로드
        handleImageUpload(file);
      } catch (error) {
        console.error('업로드 에러', error);
      }
    }
  };
  return (
    <ScContainer>
      <h1>프로필 페이지</h1>
      <ScProfileContainer>
        <ProfileImage src={isEditMode ? newProfileImage || profileImage : profileImage} alt="프로필" />
        <ScNickname>닉네임 : {isEditMode ? newNickname || nickname : nickname}</ScNickname>
        {/* {isEditMode ? newNickname || nickname : nickname} */}
      </ScProfileContainer>

      {isEditMode ? (
        <>
          <ScEditForm>
            <label>닉네임 수정하기</label>
            <ScNicnameUpdate
              type="text"
              value={newNickname}
              onChange={e => setNewNickname(e.target.value)}
              maxLength={6}
              placeholder="닉네임은 6글자 까지 입니다."
            />

            <label>프로필 수정하기</label>
            <ScImageInput type="file" onChange={handleImageSelect} accept="image/*" />
          </ScEditForm>
          <ScSaveButton onClick={event => handleSaveClick(event, auth.currentUser)}>저장</ScSaveButton>
        </>
      ) : (
        <ScEditButton onClick={handleEditClick}>프로필 편집</ScEditButton>
      )}
    </ScContainer>
  );
};

const ScContainer = styled.div`
  max-width: 600px;
  height: 600px;
  margin: 0 auto;
  text-align: center;
  border: 3px solid black;
  border-radius: 5px;
  margin-top: 20px;
  h1 {
    margin-top: 30px;
    font-size: 30px;
  }
`;

const ScProfileContainer = styled.div`
  margin-top: 20px;
`;

const ProfileImage = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  border: 3px solid black;
  object-fit: cover;
`;

const ScNickname = styled.h1`
  margin-top: 10px;
`;

const ScEditForm = styled.form`
  margin-top: 20px;
  text-align: center;

  label {
    display: block;
    margin-bottom: 5px;
    width: 67%;
  }
`;

const ScSaveButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  float: right;
  margin-right: 150px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const ScEditButton = styled.button`
  background-color: #008cba;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #007aa7;
  }
`;
const ScImageInput = styled.input`
  width: 53%;
  padding: 8px;
  margin-bottom: 25px;
`;
const ScNicnameUpdate = styled.input`
  width: 50%;
  padding: 8px;
  margin-bottom: 25px;
  margin-top: 10px;
`;
