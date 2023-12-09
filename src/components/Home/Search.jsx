import React, {useState} from 'react';
import styled from 'styled-components';
import {FiSearch} from 'react-icons/fi';
import DropDown from './DropDown';
import SearchingPage from './SearchingPage';

const Search = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchAddress, setSearchAddress] = useState();
  const [location, setLocation] = useState({
    // 지도의 초기 위치
    center: {lat: 33.3766655632143, lng: 126.54222094512},
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });

  const searchMap = e => {
    e.preventDefault();
    const ps = new window.kakao.maps.services.Places();
    const placesSearchCB = function (data, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        const newSearch = data[0];
        setLocation({
          center: {lat: newSearch.y, lng: newSearch.x},
        });
        console.log({lat: newSearch.y, lng: newSearch.x});
      }
    };
    ps.keywordSearch(`${searchAddress}`, placesSearchCB);
    setIsSearch(true);
  };

  const handleSearchAddress = e => {
    setSearchAddress(e.target.value);
  };
  console.log('searchAddress', searchAddress);

  return (
    <>
      <div>
        <ScSearchForm onSubmit={searchMap}>
          <ScInput
            value={searchAddress || ''}
            type="text"
            placeholder="검색할 산을 입력하세요"
            onChange={handleSearchAddress}
          />
          <ScSearchIcon />
        </ScSearchForm>
      </div>
      {isSearch ? (
        <ScSearchingResultContainer>
          <SearchingPage
            searchAddress={searchAddress}
            setSearchAddress={setSearchAddress}
            setIsSearch={setIsSearch}
            location={location}
            setLocation={setLocation}
          />
        </ScSearchingResultContainer>
      ) : (
        <DropDown />
      )}
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

const ScSearchingResultContainer = styled.div`
  width: 920px;
  height: fit-content;
  /* background-color: #e8f6ef; */
  border: 4px solid #ffe194;
  border-radius: 20px;
  margin: 30px auto;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
