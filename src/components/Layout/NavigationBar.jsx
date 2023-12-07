import React, {useState} from 'react';
import styled from 'styled-components';
import LoginModal from 'components/Login/LoginModal';
const NavigationBar = () => {
  const [isLoginModal, setIsLoginModal] = useState(true);
  return <ScNavigationContainer>{isLoginModal ? <LoginModal /> : null}</ScNavigationContainer>;
};

export default NavigationBar;

const ScNavigationContainer = styled.div`
  height: 40px;
  color: white;
  background-color: #1b9c85;
`;
