import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

function SearchingPage() {
  const mountainData = async () => {
    const {data} = await axios.get(`${process.env.REACT_APP_MOUNTAIN_API}`);
    return data;
  };

  return (
    <ScSearchingWrap>
      <div>SearchingPage</div>
    </ScSearchingWrap>
  );
}

const ScSearchingWrap = styled.div`
  width: 800px;
  margin: 30px auto;
  text-align: center;
`;
export default SearchingPage;
