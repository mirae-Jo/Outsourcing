import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const MountainCard = ({mountain}) => {
  const navigate = useNavigate();
  return (
    <ScMountainCard onClick={() => navigate(`/detail/${mountain.name}`)}>
      <div>
        <ScTagContainer>
          <h3>{mountain?.name}</h3>
          <ScTag>{mountain?.filterlocation}</ScTag>
        </ScTagContainer>
        <p>
          <span>난이도: </span>
          {mountain?.difficulty}
        </p>
        <p>
          <span>소요시간: </span>
          {mountain?.time}
        </p>
      </div>
      <ScFigure>
        <img src={`${mountain.imgUrl}`} alt={`${mountain?.name} 이미지`} />
      </ScFigure>
    </ScMountainCard>
  );
};

export default MountainCard;

const ScMountainCard = styled.div`
  width: 100%;
  max-width: 450px;
  height: 120px;
  background-color: #e0dede;
  padding: 20px;
  line-height: 1.5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  & h3 {
    font-size: x-large;
    margin-bottom: 5px;
  }
  & p {
    font-size: small;
  }
  & span {
    color: #4c4c6d;
  }
`;

const ScTagContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const ScTag = styled.div`
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 300;
  text-align: center;
  width: fit-content;
  height: fit-content;
  padding: 1px 4px;
  margin: 6px;
  color: white;
  background-color: #1b9c85;
  border-radius: 4px;
`;

const ScFigure = styled.figure`
  width: 150px;
  height: 90px;
  border-radius: 5px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
