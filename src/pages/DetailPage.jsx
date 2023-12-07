import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function DetailPage() {

  const getMountain = async () => {
    const response = await axios.get(process.env.REACT_APP_MOUNTAIN_API);
    return response.data;
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['mountain'],
    queryFn: getMountain,
  });


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log(data);
  return (
    <>
      {data.map(mountain =>
      (
        <li>
          <h1>{mountain.name}</h1>
          <img src={mountain.imgUrl} alt='mountain' />
          <p> 위치 : {mountain.location}</p>
          <p>고도 : {mountain.height}m</p>
          <p>난이도 : {mountain.difficulty}</p>
        </li>
      ))}
    </>
  );
}

export default DetailPage;
