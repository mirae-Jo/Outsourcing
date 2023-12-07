import React from 'react';
import styled from 'styled-components';
import {PiMountainsFill} from 'react-icons/pi';

const RecommendList = () => {
  return (
    <ScRecommendList>
      <ScTitle>
        <h1>추천 산</h1>
        <ScMountainIcon />
      </ScTitle>
      <ScMountainListWarapper>
        <ScMountainCard>
          <div>
            <h3>아차산</h3>
            <p>난이도:</p>
            <p>소요시간:</p>
          </div>
          <ScTag>서울</ScTag>
        </ScMountainCard>
        <ScMountainCard>
          <div>
            <h3>하남검단산</h3>
            <p>난이도:</p>
            <p>소요시간:</p>
          </div>
          <ScTag>경기</ScTag>
        </ScMountainCard>
        <ScMountainCard>
          <div>
            <h3>소백산</h3>
            <p>난이도:</p>
            <p>소요시간:</p>
          </div>
          <ScTag>경북</ScTag>
        </ScMountainCard>
        <ScMountainCard>
          <div>
            <h3>한라산</h3>
            <p>난이도:</p>
            <p>소요시간:</p>
          </div>
          <ScTag>제주</ScTag>
        </ScMountainCard>
      </ScMountainListWarapper>
    </ScRecommendList>
  );
};

export default RecommendList;

const ScRecommendList = styled.div`
  width: 80%;
  margin: 40px auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ScTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 8px;
  & h1 {
    font-size: large;
  }
`;

const ScMountainIcon = styled(PiMountainsFill)`
  font-size: 25px;
  color: #1b9c85;
`;

const ScMountainListWarapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ScMountainCard = styled.div`
  width: 400px;
  height: 120px;
  background-color: lightgray;
  margin-bottom: 15px;
  padding: 20px;
  line-height: 1.5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  width: 70px;
  height: fit-content;
  padding: 2px;
  color: white;
  background-color: #1b9c85;
  border-radius: 4px;
`;
