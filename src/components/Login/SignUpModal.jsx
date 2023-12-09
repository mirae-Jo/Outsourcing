import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { app } from 'shared/firebase';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import db from 'shared/firebase';
import { doc, setDoc } from '@firebase/firestore';
import profilenormal from '../../assets/imgs/profilenormal.jpg';

function SignUpModal({ isSignUpModal, setIsSignUpModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const auth = getAuth(app);

  const inputChange = event => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'nickname') {
      setNickname(value);
    }
  };

  const changeSignUp = event => {
    event.preventDefault();

    // 비밀번호 유효성 검사
    if (!isPasswordValid(password)) {
      setPasswordError('알파벳 대문자, 소문자, 숫자를 모두 포함하시오.');
      return;
    }

    // 중복된 이메일 체크
    checkDuplicateEmail(email);
  };

  const checkDuplicateEmail = async email => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // 사용자 정보를 Firestore에 저장
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        nickname: nickname,
        avatar: profilenormal,
      });
      // 회원가입 성공시
      // 여기에서 추가적인 로직 수행 가능
      setIsSignUpModal(false);
      setPassword('');
      setEmail('');
      setNickname('');
      console.log('회원가입 성공');
    } catch (error) {
      // 중복된 이메일일 경우 에러 발생
      console.error(error);
      setEmailError('중복된 이메일입니다.');
    }
  };

  const isPasswordValid = password => {
    // 비밀번호에 대문자, 소문자, 숫자가 모두 포함되어 있는지 여부를 확인
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    // 조건을 모두 만족하면 true를 반환, 그렇지 않으면 false를 반환
    return hasUpperCase && hasLowerCase && hasNumber;
  };

  const onCloseModal = () => {
    setIsSignUpModal(false);
  };

  return (
    <div>
      {isSignUpModal && (
        <ScModalOverlay>
          <ScLoginMoDal className="modal">
            <ScModalCloseBT onClick={onCloseModal}>X</ScModalCloseBT>
            <h2>회원가입</h2>
            <ScSection>
              <p>이메일 </p>
              <input type="email" value={email} name="email" onChange={inputChange} />
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            </ScSection>

            <ScSection>
              <p>패스워드 </p>
              <input type="password" value={password} name="password" onChange={inputChange} />
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            </ScSection>
            <ScSection>
              <p>닉네임 </p>
              <input type="nickname" value={nickname} name="nickname" onChange={inputChange}></input>
            </ScSection>

            <ScSignUpButton onClick={changeSignUp}>회원가입 하기</ScSignUpButton>
          </ScLoginMoDal>
        </ScModalOverlay>
      )}
    </div>
  );
}

const ScModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
    padding-bottom: 10px;
  }
`;

const ScModalCloseBT = styled.button`
  float: left;
  margin-left: 80%;
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
  margin-top: 10px;
  &:hover {
    background-color: #ddd;
  }
`;

const ScSection = styled.section`
  margin: 10px 0;
  color: black;
  p {
    margin-bottom: 5px;
    margin-top: 5px;
  }

  input {
    width: 300px;
    padding: 8px;
    box-sizing: border-box;
  }
`;

export default SignUpModal;
