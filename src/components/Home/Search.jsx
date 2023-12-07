import React, {useState} from 'react';
import styled from 'styled-components';
import {FiSearch} from 'react-icons/fi';
import DropDown from './DropDown';
import SearchingPage from './SearchinPage';

const Search = ({state, setState}) => {
  const [searchAddress, setSearchAddress] = useState();
  const [isSearch, setIsSearch] = useState(false);

  const SearchMap = e => {
    e.preventDefault();
    const ps = new window.kakao.maps.services.Places();
    const placesSearchCB = function (data, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        const newSearch = data[0];
        setState({
          center: {lat: newSearch.y, lng: newSearch.x},
        });
        console.log({lat: newSearch.y, lng: newSearch.x});
      }
    };
    ps.keywordSearch(`${searchAddress}`, placesSearchCB);
    setIsSearch(true);
    e.target.reset();
  };

  const handleSearchAddress = e => {
    setSearchAddress(e.target.value);
  };

  return (
    <>
      <div>
        <ScSearchForm
          onSubmit={e => {
            SearchMap(e);
          }}
        >
          <ScInput
            type="text"
            placeholder="검색할 산을 입력하세요"
            onChange={e => {
              handleSearchAddress(e);
            }}
          />
          <ScSearchIcon />
        </ScSearchForm>
      </div>
      {isSearch ? <SearchingPage /> : <DropDown />}
    </>
  );
};

export default Search;

const ScSearchForm = styled.form`
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
