import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <ScHeader>
      <ScTitle>
        <h1>한사랑 산악회</h1>
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
`;
