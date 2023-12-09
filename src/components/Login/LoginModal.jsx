import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {getUserInfo} from 'shared/firebase';
import {signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {auth} from 'shared/firebase';
import SignUpModal from './SignUpModal';
import googleicon from '../../assets/imgs/googleSignUpBtn.png';
import {doc, getDoc, setDoc} from '@firebase/firestore';
import db from 'shared/firebase';
import profilenormal from '../../assets/imgs/profilenormal.jpg';
import {useDispatch} from 'react-redux';
import {login, logout} from 'shared/redux/modules/authSlice';
import {signInWithEmailAndPassword} from 'firebase/auth';

const LoginModal = () => {
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  // const emailRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 추가: 로그인 상태 변경 감지 및 유저 정보 업데이트
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      console.log(user);
      if (user) {
        const {uid, displayName, photoURL} = user;
        if (!displayName && !photoURL) {
          const userInfo = await getUserInfo(uid);
          console.log(userInfo);
          setUser({...userInfo, uid});
          //일반 로그인 한 경우에는 로컬스토리지에 따로 닉네임과 이미지 업데이트 후 저장해줌.
          localStorage.setItem('displayName', userInfo.displayName);
          localStorage.setItem('photoURL', userInfo.photoURL);
          return;
        }
        setUser({uid, displayName, photoURL});
      }
    });

    // 컴포넌트가 언마운트될 때 cleanup
    return () => unsubscribe();
  }, []);

  const openModal = event => {
    event.preventDefault();
    setIsLoginModal(true);
  };

  const closeModal = event => {
    event.preventDefault();
    setIsLoginModal(false);
    setIsSignUpModal(false);
  };

  //로그인
  const inputChange = event => {
    const {
      target: {name, value},
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const changeSignUp = () => {
    setIsLoginModal(false);
    setIsSignUpModal(true);
  };
  // 일반 로그인
  const signIn = async event => {
    event.preventDefault();
    try {
      // 이메일 유효성 검사 초기화
      setEmailValidationMessage('');
      setPasswordValidationMessage('');
      console.log(auth);
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoginModal(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/invalid-email') {
        setEmailValidationMessage('이메일이 잘못되었습니다.');
        setEmail('');
      } else if (error.code === 'auth/user-not-found') {
        setEmailValidationMessage('존재하지 않는 이메일입니다.');
      }

      if (error.code === 'auth/invalid-credential') {
        setPasswordValidationMessage('비밀번호가 잘못되었습니다.');
        setPassword('');
      }
    }
  };

  const logoutBT = async event => {
    event.preventDefault();

    // 확인 메시지 표시
    const isConfirmed = window.confirm('로그아웃 하시겠습니까?');

    // 사용자가 '예'를 선택한 경우에만 로그아웃
    if (isConfirmed) {
      await signOut(auth);
      window.alert('로그아웃 되었습니다.');

      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 500);
      dispatch(logout());
      // 로그아웃 후 페이지 새로고침
    }
  };
  // Firestore에 사용자 정보 저장 함수
  const saveUserDataToFirestore = async user => {
    const userDocRef = doc(db, 'users', user.uid);

    // 사용자 정보가 이미 있는지 확인
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      // 사용자 정보가 없다면 Firestore에 저장
      await setDoc(userDocRef, {
        email: user.email,
        nickName: user.displayName,
        avatar: profilenormal,
        photoURL: user.photoURL,
        // 기타 필요한 사용자 정보 추가
      });

      console.log('사용자 정보 Firestore에 저장 완료');
      console.log(setDoc);
    } else {
      console.log('이미 사용자 정보가 Firestore에 존재합니다.');
    }
  };
  //구글 로그인
  const googleLogin = async () => {
    try {
      // Firebase에서 제공하는 GoogleAuthProvider 사용
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      const result = await signInWithPopup(auth, provider);

      // 추가: 사용자 정보 Firestore에 저장
      await saveUserDataToFirestore(result.user);

      // 성공 시, 로그인 모달 닫기
      setIsLoginModal(false);

      // 추가: 로그인 후 유저 정보 갱신
      setUser(result.user);
      const {uid, displayName, photoURL} = result.user;
      dispatch(login({uid, displayName, photoURL}));

      // 추가: Firestore에 사용자 정보 저장
    } catch (error) {
      console.error(error);
    }

    window.location.reload();
  };

  return (
    <div>
      {/* 추가: user 상태에 따라 로그인 또는 로그아웃 버튼 보이기 */}
      {user ? (
        <ScModalClickBt onClick={logoutBT}>로그아웃</ScModalClickBt>
      ) : (
        <ScModalClickBt onClick={openModal}> 로그인</ScModalClickBt>
      )}

      {(isLoginModal || isSignUpModal) && (
        <ScModalOverlay>
          <ScLoginMoDal className="modal">
            <ScModalCloseBT onClick={closeModal}>X</ScModalCloseBT>
            <h2>로그인</h2>

            <ScSection>
              <p>이메일 </p>
              <input type="email" value={email} name="email" onChange={inputChange} />
              {emailValidationMessage && <p style={{color: 'red'}}>{emailValidationMessage}</p>}
            </ScSection>
            <ScSection>
              <p>패스워드 </p>
              <input type="password" value={password} name="password" onChange={inputChange} />
              {passwordValidationMessage && <p style={{color: 'red'}}>{passwordValidationMessage}</p>}
            </ScSection>

            <ScLoginButton onClick={signIn}>로그인</ScLoginButton>
            <ScSocialLoginButton onClick={googleLogin}>
              <img src={googleicon} alt="googleicon" />
            </ScSocialLoginButton>
            <ScSignUpButton onClick={changeSignUp}>회원가입</ScSignUpButton>
          </ScLoginMoDal>
        </ScModalOverlay>
      )}

      {!isLoginModal && <SignUpModal isSignUpModal={isSignUpModal} setIsSignUpModal={setIsSignUpModal} />}
    </div>
  );
};

const ScModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ScLoginMoDal = styled.div`
  width: 400px;
  height: 450px;
  background-color: #fff;
  border-radius: 8px;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 30px;
    color: black;
  }
`;

const ScModalCloseBT = styled.button`
  float: left;
  margin-left: 80%;
  margin-top: 10px;
  width: 30px;
  height: 30px;
  font-weight: bold;
  border-radius: 3px;

  &:hover {
    background-color: #ddd;
  }
`;
const ScSignUpButton = styled.button`
  height: 40px;
  width: 50%;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #ffffff;
  &:hover {
    background-color: #ddd;
  }
`;

const ScSocialLoginButton = styled.button`
  display: flex;
  width: 80%;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  margin-top: 10px;
  margin-bottom: 10px;

  color: #fff;
  cursor: pointer;

  img {
    height: 40px;
    width: 200px;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const ScLoginButton = styled.button`
  height: 40px;
  width: 50%;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #ffffff;

  &:hover {
    background-color: #ddd;
  }
`;

const ScSection = styled.section`
  margin: 10px 0;
  color: black;
  p {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  input {
    width: 300px;
    padding: 8px;
    box-sizing: border-box;
  }
`;
const ScModalClickBt = styled.button`
  border-radius: 5px;
  border: 1px solid black;
  border-width: medium;
  background-color: #ffffff;
  float: right;
  margin-top: 10px;
  margin-right: 20px;
  font-weight: bold;
  width: 100px;
  height: 30px;
  &:hover {
    background-color: #ddd;
  }
  &:hover {
    background-color: #ddd;
  }
`;
export default LoginModal;
