import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router';
import {styled} from 'styled-components';
import AddComment from 'components/Detail/AddComment';
import {useSelector} from 'react-redux';
import {getMountains} from 'common/api/mountains';
import {PiMountainsFill} from 'react-icons/pi';
import MapDetail from 'components/Detail/MapDetail';

function DetailPage() {
  const params = useParams();
  const auth = useSelector(state => state.user_auth);
  console.log(auth);
  const {
    isLoading,
    error,
    data: mountains,
  } = useQuery({
    queryKey: ['mountain'],
    queryFn: getMountains,
  });

  const filterMountain = mountains?.filter(mountain => mountain.name === params.mountainName);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {filterMountain.map(mountain => {
        const {name, imgUrl, summary, location, height, time, difficulty, xCoordinate, yCoordinate} = mountain;
        return (
          <ScMountainInfoContainer key={name}>
            <ScMountainImgWrapper>
              <img src={imgUrl} />
              <ScSummary>
                <h1>{name}</h1>
                <p>{summary}</p>
              </ScSummary>
            </ScMountainImgWrapper>
            <ScMountainDetail>
              <ScMountainInfo>
                <ScMountainName>
                  <ScMountainIcon />
                  <h3>
                    <span>{name}</span> 상세정보
                  </h3>
                </ScMountainName>
                <p>위치 : {location}</p>
                <p>고도 : {height}m</p>
                <p>난이도 : {difficulty}</p>
                <p>소요시간 : {time}</p>
              </ScMountainInfo>
              <ScMapWrapper>
                <ScMap name={name} xCoordinate={xCoordinate} yCoordinate={yCoordinate} />
              </ScMapWrapper>
            </ScMountainDetail>
          </ScMountainInfoContainer>
        );
      })}
      <AddComment />
    </>
  );
}

export default DetailPage;

const ScMountainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const ScMountainImgWrapper = styled.div`
  position: relative;
  height: 350px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
  background-size: cover;
  background-position: center;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
`;

const ScSummary = styled.div`
  width: 70%;
  height: fit-content;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
  color: white;
  min-width: 70%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px 0;
  & h1 {
    font-size: 2.2rem;
    margin: 0;
  }
  & p {
    font-family: sans-serif;
    font-size: 1rem;
    line-height: 1.5rem;
    word-break: keep-all;
    margin: 0;
  }
`;

const ScMountainDetail = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 20px;
  margin: 20px 0;
`;

const ScMountainInfo = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  line-height: 1.7;
  font-size: 1.2rem;
`;

const ScMapWrapper = styled.div`
  position: relative;
  width: 350px;
  height: 320px;
  min-width: 350px;
  min-height: 320px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  border: 2px solid var(--color-main);
  overflow: hidden;
`;

const ScMap = styled(MapDetail)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ScMountainName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 1.7rem;
  margin: 20px 0;
  & span {
    color: var(--color-main);
  }
`;

const ScMountainIcon = styled(PiMountainsFill)`
  font-size: 2rem;
  color: var(--color-main);
`;
