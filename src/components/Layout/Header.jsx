import React from 'react';
import styled from 'styled-components';
import logo from 'assets/imgs/logo.png';
import logo2 from 'assets/imgs/logo2.webp';

function Header() {
  return (
    <ScHeader>
      <ScTitle>
        {/* <img src={logo2} alt="로고이미지" /> */}
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
  }
`;
