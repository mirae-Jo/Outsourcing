import React, {useState} from 'react';
import styled from 'styled-components';
import LoginModal from 'components/Login/LoginModal';
import {useNavigate} from 'react-router';
const NavigationBar = () => {
  const navigate = useNavigate();
  const [isLoginModal, setIsLoginModal] = useState(true);
  const goHomeBT = () => {
    navigate(`/`);
  };
  return (
    <ScNavigationContainer>
      {isLoginModal ? <LoginModal /> : null}
      <HomeBT onClick={goHomeBT}>홈으로 </HomeBT>
    </ScNavigationContainer>
  );
};

export default NavigationBar;

const HomeBT = styled.button`
  border-radius: 5px;
  background-color: #ffffff;
  float: left;
  margin-top: 10px;
  margin-left: 15px;
  font-weight: bold;
  width: 100px;
  height: 30px;
  &:hover {
    background-color: #ddd;
  }
`;

const ScNavigationContainer = styled.div`
  height: 50px;
  color: white;
  background-color: #1b9c85;
`;
