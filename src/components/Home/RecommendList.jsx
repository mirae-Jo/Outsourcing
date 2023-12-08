import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {PiMountainsFill} from 'react-icons/pi';
import {useQuery} from '@tanstack/react-query';
import MountainCard from 'common/MountainCard';
import {getMountains} from 'common/api/mountains';

const ITEM_COUNT = 4;

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const RecommendList = () => {
  const [mountains, setMountains] = useState([]);
  const {isLoading, isError, data} = useQuery({
    queryKey: ['mountains'],
    queryFn: getMountains,
  });

  useEffect(() => {
    getMountains();
  }, []);

  useEffect(() => {
    if (!data) return;
    const newMountains = [];
    const numbers = []; // 10, 20, 30

    for (let i = 0; i < ITEM_COUNT; i++) {
      let randomNumber = getRandomInt(0, data.length);
      while (numbers.includes(randomNumber)) {
        randomNumber = getRandomInt(0, data.length);
      }
      numbers.push(randomNumber);
      newMountains.push(data[randomNumber]);
    }
    setMountains(newMountains);
  }, [data]);

  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  if (isError) {
    return <p>오류가 발생했습니다...</p>;
  }
  if (!data || data.length === 0) {
    return <p>산 정보가 없습니다.</p>;
  }

  return (
    <ScRecommendList>
      <ScTitle>
        <h1>추천 산</h1>
        <ScMountainIcon />
      </ScTitle>
      <ScMountainListWarapper>
        {mountains.map((item, index) => (
          <MountainCard mountain={item} />
        ))}
      </ScMountainListWarapper>
    </ScRecommendList>
  );
};

export default RecommendList;

const ScRecommendList = styled.div`
  max-width: 100%;
  width: 920px;
  margin: 20px auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  user-select: none;
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
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 auto;
`;

// const ScMountainCard = styled.div`
//   width: 100%;
//   max-width: 450px;
//   height: 120px;
//   background-color: lightgray;
//   padding: 20px;
//   line-height: 1.5;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   & h3 {
//     font-size: x-large;
//     margin-bottom: 5px;
//   }
//   & p {
//     font-size: small;
//   }
// `;

// const ScTag = styled.div`
//   font-family: sans-serif;
//   font-size: 13px;
//   font-weight: 300;
//   text-align: center;
//   width: 85px;
//   height: fit-content;
//   padding: 2px;
//   color: white;
//   background-color: #1b9c85;
//   border-radius: 4px;
// `;
