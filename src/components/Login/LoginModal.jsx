import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {app} from 'shared/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from 'shared/firebase';
import SignUpModal from './SignUpModal';

const LoginModal = () => {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const openModal = event => {
    event.preventDefault();
    setIsLoginModal(true);
  };

  const closeModal = event => {
    event.preventDefault();
    setIsLoginModal(false);
    setIsSignUpModal(false); // 추가: 로그인 모달이 닫힐 때 회원가입 모달도 닫도록
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

  return (
    <div>
      <button onClick={openModal}>로그인 모달창</button>

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

            <button>로그인</button>
            <button onClick={changeSignUp}>회원가입</button>
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
  width: 500px;
  height: 500px;
  background-color: red;
`;

const ScModalCloseBT = styled.button`
  float: right;
  width: 30px;
  height: 30px;
  font-weight: bold;
`;

export default LoginModal;
