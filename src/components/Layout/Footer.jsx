import React from 'react';
import styled from 'styled-components';
import {FaGithub} from 'react-icons/fa';

function Footer() {
  const handleGithubClick = () => {
    window.open('https://github.com/mirae-Jo/Outsourcing.git', '_blank');
  };
  return (
    <ScFooterContainer>
      <ScTeamName>
        <ScGithubIcon onClick={handleGithubClick} />
        <h4>한사랑 산악회</h4>
      </ScTeamName>
      <ScTeamInfo>
        <div>
          <h3>산악회장 |</h3>
          <p>조미래</p>
        </div>
        <div>
          <h3>산악회원 |</h3>
          <p>권보라, </p>
          <p>권영준,</p>
          <p>정유진</p>
        </div>
      </ScTeamInfo>
    </ScFooterContainer>
  );
}

export default Footer;

const ScFooterContainer = styled.div`
  height: 100px;
  background-color: #e8f6ef;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 25px;
`;

const ScGithubIcon = styled(FaGithub)`
  font-size: 25px;
  cursor: pointer;
`;

const ScTeamName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const ScTeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: small;
  line-height: 1.3;
  & div {
    display: flex;
  }
`;
