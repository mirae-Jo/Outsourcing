import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {app} from 'shared/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {auth} from 'shared/firebase';
import SignUpModal from './SignUpModal';

const LoginModal = () => {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // 추가: 로그인 상태를 나타내는 state

  // 추가: 로그인 상태 변경 감지 및 유저 정보 업데이트
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
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

  const signIn = async event => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoginModal(false);
      setEmail(``);
      setPassword(``);
    } catch (error) {
      console.error(error);
    }
  };

  const logoutBT = async event => {
    event.preventDefault();
    await signOut(auth);
  };

  //구글 로그인
  const googleLogin = async () => {
    try {
      // Firebase에서 제공하는 GoogleAuthProvider 사용
      const provider = new GoogleAuthProvider();

      // 팝업을 통해 Google 로그인 창 열기
      const result = await signInWithPopup(auth, provider);

      // 성공 시, 로그인 모달 닫기
      setIsLoginModal(false);

      // 추가: 로그인 후 유저 정보 갱신
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* 추가: user 상태에 따라 로그인 또는 로그아웃 버튼 보이기 */}
      {user ? <button onClick={logoutBT}>로그아웃</button> : <button onClick={openModal}> 로그인</button>}

      {(isLoginModal || isSignUpModal) && (
        <ScModalOverlay>
          <ScLoginMoDal className="modal">
            <ScModalCloseBT onClick={closeModal}>X</ScModalCloseBT>
            <h2>로그인</h2>
            <section>
              <p>이메일 : </p>
              <input type="email" value={email} name="email" onChange={inputChange} />
            </section>

            <section>
              <p>패스워드 : </p>
              <input type="password" value={password} name="password" onChange={inputChange} />
            </section>

            <ScLoginButton onClick={signIn}>로그인</ScLoginButton>
            <ScSocialLoginButton onClick={googleLogin}>구글로 로그인</ScSocialLoginButton>
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
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ScModalCloseBT = styled.button`
  float: right;
  width: 30px;
  height: 30px;
  font-weight: bold;
`;
const ScSignUpButton = styled.button`
  margin-top: 10px;
  height: 40px;
  background-color: #190482;
  color: #fff;
  cursor: pointer;
`;

const ScSocialLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8e8ffa;
  margin-top: 10px;
  height: 40px;
  color: #fff;
  cursor: pointer;

  img {
    height: 1.1rem;
    margin-right: 10px;
  }
`;

const ScLoginButton = styled.button`
  margin-top: 10px;
  height: 40px;
  cursor: pointer;
`;
export default LoginModal;
