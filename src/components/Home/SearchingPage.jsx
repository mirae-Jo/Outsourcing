import {useQuery} from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';
import {getMountains} from 'api/mountains';
import {useNavigate} from 'react-router-dom';

function SearchingPage({searchAddress, setSearchAddress}) {
  const {isLoading, isError, data} = useQuery({
    queryKey: ['mountains'],
    queryFn: getMountains,
  });
  const navigate = useNavigate();

  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  if (isError) {
    return <p>오류가 발생했습니다...</p>;
  }

  if (!data || data.length === 0) {
    return <p>산 정보가 없습니다.</p>;
  }

  const filteredData = data.filter(item => {
    const mountainName = item.name;
    return mountainName.includes(searchAddress);
  });
  console.log(filteredData);

  return (
    <ScSearchingWrap>
      {filteredData.length === 0 ? (
        <p>산 정보가 없습니다.</p>
      ) : (
        filteredData.map(mountain => {
          return (
            <ScMountainCard onClick={() => navigate(`/detail/${mountain.name}`)}>
              <div>
                <h3>{mountain.name}</h3>
                <p>난이도:{mountain.difficulty}</p>
                <p>소요시간:{mountain.time}</p>
              </div>
              <ScTag>{mountain.filterlocation}</ScTag>
            </ScMountainCard>
          );
        })
      )}
    </ScSearchingWrap>
  );
}

const ScSearchingWrap = styled.div`
  width: 800px;
  margin: 30px auto;
`;
const ScMountainCard = styled.div`
  width: 100%;
  max-width: 490px;
  height: 120px;
  margin: 10px auto;
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
export default SearchingPage;
