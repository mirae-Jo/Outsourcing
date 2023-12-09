import {useQuery} from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';
import {getMountains} from 'common/api/mountains';
import MountainCard from 'common/MountainCard';

function SearchingPage({searchAddress, setSearchAddress}) {
  const {isLoading, isError, data} = useQuery({
    queryKey: ['mountains'],
    queryFn: getMountains,
  });

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
          return <MountainCard mountain={mountain} />;
        })
      )}
    </ScSearchingWrap>
  );
}

const ScSearchingWrap = styled.div`
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 30px auto;
`;

export default SearchingPage;
