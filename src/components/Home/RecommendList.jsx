import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PiMountainsFill } from 'react-icons/pi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getMountains } from 'api/mountains';
import { useQuery } from '@tanstack/react-query';

const RecommendList = () => {
  const [mountain, setMountain] = useState();
  const navigate = useNavigate();
  const mountainData = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_MOUNTAIN_API}`);
    // console.log(data);
    const randomNumber = Math.floor(Math.random() * 100);
    return data[randomNumber];
  };

  useEffect(() => {
    (async () => {
      const randomMountain = await mountainData();
      setMountain(randomMountain);
    })();
  }, []);
  const { isLoading, isError, data } = useQuery({
    queryKey: ['mountains'],
    queryFn: getMountains,
  });

  console.log(data);

  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  if (isError) {
    return <p>오류가 발생했습니다...</p>;
  }

  if (!data || data.length === 0) {
    return <p>산 정보가 없습니다.</p>;
  }

  getMountains();


  return (
    <ScRecommendList>
      <ScTitle>
        <h1>추천 산</h1>
        <ScMountainIcon />
      </ScTitle>
      <ScMountainListWarapper>
        <ScMountainCard onClick={() => navigate(`/detail/${mountain.name}`)}>
          <div>
            <h3>{mountain?.name}</h3>
            <p>난이도:{mountain?.difficulty}</p>
            <p>소요시간:{mountain?.time}</p>
          </div>
          <ScTag>{mountain?.filterlocation}</ScTag>
        </ScMountainCard>
        <ScMountainCard>
          <div>
            <h3>{mountain?.name}</h3>
            <p>난이도:{mountain?.difficulty}</p>
            <p>소요시간:{mountain?.time}</p>
          </div>
          <ScTag>{mountain?.filterlocation}</ScTag>
        </ScMountainCard>
        <ScMountainCard>
          <div>
            <h3>{mountain?.name}</h3>
            <p>난이도:{mountain?.difficulty}</p>
            <p>소요시간:{mountain?.time}</p>
          </div>
          <ScTag>{mountain?.filterlocation}</ScTag>
        </ScMountainCard>
        <ScMountainCard>
          <div>
            <h3>{mountain?.name}</h3>
            <p>난이도:{mountain?.difficulty}</p>
            <p>소요시간:{mountain?.time}</p>
          </div>
          <ScTag>{mountain?.filterlocation}</ScTag>
        </ScMountainCard>
      </ScMountainListWarapper>
    </ScRecommendList>
  );
};

export default RecommendList;

const ScRecommendList = styled.div`
  max-width: 100%;
  width: 1000px;
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
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 auto;
`;

const ScMountainCard = styled.div`
  width: 100%;
  max-width: 490px;
  height: 120px;
  background-color: lightgray;
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
