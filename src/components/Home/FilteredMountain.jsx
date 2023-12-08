import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getMountains} from 'common/api/mountains';
import MountainCard from 'common/MountainCard';

const FilteredMountain = ({selectedDetailCategory}) => {
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

  console.log(data);

  const filteredMountain = data.filter(mountain => {
    return mountain.filterlocation === selectedDetailCategory ? mountain : <p>조건에 맞는 산이 없습니다.</p>;
  });

  // const mountainMatchCategory = (mountain, category) => {
  //   switch (category) {
  //     case 'filterlocation':
  //       return mountain.filterlocation === mountain[category];
  //     case 'difficulty':
  //       return mountain.difficulty === mountain[category];
  //     case 'time':
  //       return mountain.time === mountain[category];

  //     default:
  //       return false;
  //   }
  // };

  //   const filteredMountain = data.filter(mountain => {

  //     selectedDetailCategory === (mountain.filterlocation || mountain.difficulty || mountain.time)
  // ?
  // : <p>없습니다.</p>
  //   });

  // const filteredMountains = data.filter(mountain => {
  //   return mountainMatchCategory(mountain, selectedDetailCategory);
  // });

  console.log(filteredMountain);

  return (
    <div>
      {/* {filteredMountain.map((mountain, index) => {
        return <MountainCard key={index} mountain={mountain} />;
      })} */}
    </div>
  );
};

export default FilteredMountain;
