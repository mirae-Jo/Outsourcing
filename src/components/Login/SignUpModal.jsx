import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {app} from 'shared/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from 'shared/firebase';

function SignUpModal({isSignUpModal, setIsSignUpModal}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const navigate = useNavigate();

  //회원가입
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
    if (name === 'nickname') {
      setNickname(value);
    }
  };

  const changeSignUp = () => {
    setIsSignUpModal(false);
  };

  const onCloseModal = () => {
    setIsSignUpModal(false);
  };

  return (
    <div>
      {isSignUpModal && (
        <ScLoginMoDal className="modal">
          <ScModalCloseBT onClick={onCloseModal}>X</ScModalCloseBT>
          <h2>회원가입</h2>
          <section>
            <p>이메일 : </p>
            <input type="email" value={email} name="email" onChange={inputChange} />
          </section>

          <section>
            <p>패스워드 : </p>
            <input type="password" value={password} name="password" onChange={inputChange} />
          </section>
          <section>
            <p>닉네임 : </p>
            <input type="nickname" value={nickname} name="nickname" onChange={inputChange}></input>
          </section>

          <button onClick={changeSignUp}>회원가입 하기</button>
        </ScLoginMoDal>
      )}
    </div>
  );
}

const ScLoginMoDal = styled.div`
  width: 500px;
  height: 500px;
  background-color: red;
  margin: 0 auto;
`;

const ScModalCloseBT = styled.button`
  float: right;
  width: 30px;
  height: 30px;
  font-weight: bold;
`;

export default SignUpModal;
