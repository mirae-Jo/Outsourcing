import React from 'react';
import styled from 'styled-components';
import logo from 'assets/imgs/logo.png';
import mainImg from 'assets/imgs/mainImg.png';

function Header() {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <ScHeader>
      <ScTitle src={logo} alt="로고이미지" onClick={handleLogoClick} />
      <ScMainImg src={mainImg} alt="메인이미지" />
    </ScHeader>
  );
}

export default Header;

const ScHeader = styled.div`
  width: 100%;
  height: fit-content;
  /* background-color: #ffe194; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;

const ScTitle = styled.img`
  width: 200px;
  cursor: pointer;
`;

const ScMainImg = styled.img`
  width: 300px;
`;
