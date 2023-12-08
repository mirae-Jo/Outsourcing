import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const MountainCard = ({mountain}) => {
  const navigate = useNavigate();
  return (
    <ScMountainCard onClick={() => navigate(`/detail/${mountain.name}`)}>
      <div>
        <h3>{mountain?.name}</h3>
        <p>난이도: {mountain?.difficulty}</p>
        <p>소요시간: {mountain?.time}</p>
      </div>
      <ScTag>{mountain?.filterlocation}</ScTag>
    </ScMountainCard>
  );
};

export default MountainCard;

const ScMountainCard = styled.div`
  width: 100%;
  max-width: 450px;
  height: 120px;
  background-color: lightgray;
  padding: 20px;
  line-height: 1.5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  & h3 {
    font-size: x-large;
    margin-bottom: 5px;
  }
  & p {
    font-size: small;
  }
`;

const ScTag = styled.div`
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 300;
  text-align: center;
  width: 85px;
  height: fit-content;
  padding: 2px;
  color: white;
  background-color: #1b9c85;
  border-radius: 4px;
`;
