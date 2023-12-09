import React from 'react';
import styled from 'styled-components';
import {FaGithub} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const handleGithubClick = () => {
    window.open('https://github.com/mirae-Jo/Outsourcing.git', '_blank');
  };
  return (
    <ScFooterContainer>
      <ScTeamName>
        <ScGithubIcon onClick={handleGithubClick} />
        <h4>미래조</h4>
      </ScTeamName>
    </ScFooterContainer>
  );
}

export default Footer;

const ScFooterContainer = styled.div`
  height: 100px;
  background-color: #e8f6ef;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
