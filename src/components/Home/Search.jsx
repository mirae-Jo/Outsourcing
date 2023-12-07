import React from 'react';
import styled from 'styled-components';
import {FiSearch} from 'react-icons/fi';
import DropDown from './DropDown';

const Search = () => {
  return (
    <>
      <ScSearchContainer>
        <ScInput type="text" placeholder="검색할 산을 입력하세요" />
        <ScSearchIcon />
      </ScSearchContainer>
      <DropDown />
    </>
  );
};

export default Search;

const ScSearchContainer = styled.div`
  width: 400px;
  height: 40px;
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ScInput = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #4c4c6d;
  border-radius: 20px;
  padding-left: 25px;
  outline: none;
`;

const ScSearchIcon = styled(FiSearch)`
  position: absolute;
  left: 90%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 25px;
  color: #4c4c6d;
  z-index: 10;
  cursor: pointer;
`;
