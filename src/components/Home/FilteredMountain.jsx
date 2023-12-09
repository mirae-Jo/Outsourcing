import React, {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import styled from 'styled-components';
import {getMountains} from 'common/api/mountains';
import MountainCard from 'common/MountainCard';

const FilteredMountain = ({selectedCategories, selectedDetailCategories}) => {
  const [filteredMountains, setFilteredMountains] = useState([]);

  const {isLoading, isError, data} = useQuery({
    queryKey: ['mountains'],
    queryFn: getMountains,
  });

  const filterTime = time => {
    if (time < 1) {
      return '1시간 미만';
    } else if (time >= 1 && time < 2) {
      return '1~2시간';
    } else if (time >= 2 && time < 3) {
      return '2~3시간';
    } else if (time >= 3 && time < 4) {
      return '3~4시간';
    } else {
      return '4시간 이상';
    }
  };

  useEffect(() => {
    if (data) {
      const filteredData = data.filter(mountain => {
        return selectedCategories.every(category => {
          switch (category) {
            case 'region':
              return selectedDetailCategories[category] === mountain.filterlocation;
            case 'difficulty':
              return selectedDetailCategories[category] === mountain.difficulty;
            case 'duration':
              return selectedDetailCategories[category] === filterTime(mountain.filtertime);
            default:
              return false;
          }
        });
      });
      setFilteredMountains(filteredData);
    }
  }, [selectedCategories, selectedDetailCategories, data]);

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
    <>
      {filteredMountains.length > 0 ? (
        <ScMountainListWarapper>
          {filteredMountains.map((mountain, index) => {
            return <MountainCard key={index} mountain={mountain} />;
          })}
        </ScMountainListWarapper>
      ) : (
        <ScNoResultText>
          <p>결과와 일치하는 산이 없습니다.</p>
        </ScNoResultText>
      )}
    </>
  );
};

export default FilteredMountain;

const ScMountainListWarapper = styled.div`
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin: 30px auto;
`;

const ScNoResultText = styled.div`
  text-align: center;
  margin: 50px auto;
  width: fit-content;
  background-color: #e8f6ef;
  padding: 15px 30px;
  border-radius: 20px;
`;
