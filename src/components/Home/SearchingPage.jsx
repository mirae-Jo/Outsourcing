import {useQuery} from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';
import {getMountains} from 'common/api/mountains';
import MountainCard from 'common/MountainCard';
import KakaoMap from './KakaoMap';
import {MdOutlineCancel} from 'react-icons/md';

function SearchingPage({searchAddress, setSearchAddress, setIsSearch, location, setLocation}) {
  const {isLoading, isError, data} = useQuery({
    queryKey: ['mountains'],
    queryFn: getMountains,
  });

  const handleFilterCancleClick = () => {
    setIsSearch(false);
    setSearchAddress('');
  };

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
      <section>
        <ScCancleIcon onClick={handleFilterCancleClick} />
      </section>
      <ScTitle>
        About <span>{searchAddress}</span>
      </ScTitle>
      {filteredData.length === 0 ? (
        <ScNoResultText>
          <p>검색 결과와 일치하는 산이 없습니다.</p>
        </ScNoResultText>
      ) : (
        filteredData.map(mountain => {
          return (
            <>
              <MountainCard mountain={mountain} size="large" />
              <KakaoMap location={location} setLocation={setLocation} />
            </>
          );
        })
      )}
    </ScSearchingWrap>
  );
}

export default SearchingPage;

const ScSearchingWrap = styled.div`
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ScCancleIcon = styled(MdOutlineCancel)`
  margin-left: 4px;
  font-size: 30px;
  color: var(--color-yellow);
  cursor: pointer;
`;

const ScNoResultText = styled.div`
  text-align: center;
  margin: 30px auto;
  width: fit-content;
  background-color: #e8f6ef;
  padding: 15px 30px;
  border-radius: 20px;
`;

const ScTitle = styled.p`
  margin: 25px;
  font-size: 25px;
  & span {
    color: var(--color-main);
  }
`;
