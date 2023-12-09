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
    if (data && data.length > 0) {
      const filtered = data.filter(mountain => {
        switch (selectedCategories) {
          case 'region':
            return mountain.filterlocation === selectedDetailCategories;
          case 'difficulty':
            return mountain.difficulty === selectedDetailCategories;
          case 'duration':
            return filterTime(mountain.filtertime) === selectedDetailCategories;
          default:
            return false;
        }
      });
      console.log(filtered);
      setFilteredMountains(filtered);
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
    <ScMountainListWarapper>
      {filteredMountains.map((mountain, index) => {
        return <MountainCard key={index} mountain={mountain} />;
      })}
    </ScMountainListWarapper>
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
