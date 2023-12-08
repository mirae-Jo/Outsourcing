import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router';
import {styled} from 'styled-components';
import AddComment from 'components/Detail/AddComment';
import CommentList from 'components/Detail/CommentList';
import {useSelector} from 'react-redux';
import {getMountains} from 'common/api/mountains';

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
        const {name, imgUrl, summary, location, height, time, difficulty} = mountain;
        return (
          <ScMountainInfo key={name}>
            <ScMountainImg img={imgUrl}>
              <h1>{name}</h1>
              <p>{summary}</p>
            </ScMountainImg>
            <ScMountainDetail>
              <p> 위치 : {location}</p>
              <p>고도 : {height}m</p>
              <p>난이도 : {difficulty}</p>
              <p>소요시간 : {time}</p>
            </ScMountainDetail>
          </ScMountainInfo>
        );
      })}
      <AddComment />
      <CommentList />
    </>
  );
}

const ScMountainInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ScMountainImg = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  margin-bottom: 1rem;

  h1 {
    position: absolute;
    left: 50%;
    top: 10%;
    font-size: 2rem;
    color: white;
    padding: 0.5rem;
  }

  p {
    position: absolute;
    left: 10%;
    top: 30%;
    font-size: 1.2rem;
    color: white;
    padding: 1rem 5rem;
  }
`;

const ScMountainDetail = styled.div`
  width: 450px;
  padding: 2rem;
  background-color: var(--color-yellow);
  border-radius: 1rem;
`;

export default DetailPage;
