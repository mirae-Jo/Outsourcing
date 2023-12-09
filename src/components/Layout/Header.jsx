import React from 'react';
import styled from 'styled-components';
import logo from 'assets/imgs/logo.png';
import {useNavigate} from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <ScHeader>
      <ScTitle>
        <img src={logo} alt="로고이미지" />
      </ScTitle>
    </ScHeader>
  );
}

export default Header;

const ScHeader = styled.div`
  width: 100%;
  height: 150px;
  background-color: #ffe194;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScTitle = styled.div`
  display: block;
  font-size: 30px;
  & img {
    width: 200px;
    cursor: pointer;
  }
`;
