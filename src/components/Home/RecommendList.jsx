import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {PiMountainsFill} from 'react-icons/pi';
import {useQuery} from '@tanstack/react-query';
import MountainCard from 'common/MountainCard';
import {getMountains} from 'common/api/mountains';

const RecommendList = () => {
  // const [mountain, setMountain] = useState();
  const {isLoading, isError, data} = useQuery({
    queryKey: ['mountains'],
    queryFn: getMountains,
  });
  const randomNumber = useRef(0);
  useEffect(() => {
    randomNumber.current = Math.floor(Math.random() * 100);
  }, []);

  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  if (isError) {
    return <p>오류가 발생했습니다...</p>;
  }
  if (!data || data.length === 0) {
    return <p>산 정보가 없습니다.</p>;
  }
  const randomMountain = data[randomNumber.current];

  getMountains();

  return (
    <ScRecommendList>
      <ScTitle>
        <h1>추천 산</h1>
        <ScMountainIcon />
      </ScTitle>
      <ScMountainListWarapper>
        <MountainCard mountain={randomMountain} />
        <MountainCard mountain={randomMountain} />
        <MountainCard mountain={randomMountain} />
        <MountainCard mountain={randomMountain} />
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
