import React from 'react';
import styled from 'styled-components';
import logo from 'assets/imgs/logo.png';

function Header() {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <ScHeader>
      <ScTitle>
        <img src={logo} alt="로고이미지" onClick={handleLogoClick} />
      </ScTitle>
    </ScHeader>
  );
}

export default Header;

const ScHeader = styled.div`
  width: 100%;
  height: 150px;
  /* background-color: #ffe194; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;

const ScTitle = styled.div`
  display: block;
  font-size: 30px;
  & img {
    width: 200px;
    cursor: pointer;
  }
`;
