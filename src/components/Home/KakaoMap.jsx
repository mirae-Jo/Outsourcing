import {Map, MapMarker} from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import searchIcon from '../../assets/imgs/baseline_search_black.png';
import {useState} from 'react';

function KakaoMap() {
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: {lat: 37.49676871972202, lng: 127.02474726969814},
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  const [searchAddress, SetSearchAddress] = useState();

  // 키워드 입력후 검색 클릭 시 원하는 키워드의 주소로 이동
  const SearchMap = e => {
    e.preventDefault();
    const ps = new window.kakao.maps.services.Places();
    const placesSearchCB = function (data, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        const newSearch = data[0];
        setState({
          center: {lat: newSearch.y, lng: newSearch.x},
        });
      }
    };
    ps.keywordSearch(`${searchAddress}`, placesSearchCB);
  };

  const handleSearchAddress = e => {
    SetSearchAddress(e.target.value);
  };

  return (
    <ScWrap>
      <ScSearchWrap>
        <ScSearchBox
          onSubmit={e => {
            SearchMap(e);
          }}
        >
          <ScSearchInput
            onChange={e => {
              handleSearchAddress(e);
            }}
            placeholder="검색어를 입력하세요"
          ></ScSearchInput>
          <ScSearchBtn type="submit">
            <ScSearchIconImg src={searchIcon} />
          </ScSearchBtn>
        </ScSearchBox>
      </ScSearchWrap>
      <Map // 지도를 표시할 Container
        center={state.center}
        isPanto={state.isPanto}
        style={{
          // 지도의 크기
          width: '800px',
          height: '450px',
        }}
        level={3} // 지도의 확대 레벨
      >
        <MapMarker // 인포윈도우를 생성하고 지도에 표시합니다
          position={state.center}
          clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        ></MapMarker>
      </Map>
    </ScWrap>
  );
}

const ScWrap = styled.div`
  width: 800px;
  margin: 0 auto;
`;

const ScSearchWrap = styled.div`
  width: 400px;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
`;
const ScSearchBox = styled.form`
  position: relative;
  width: 100%;
  height: 40px;
`;
const ScSearchInput = styled.input`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 20px;
  padding: 10px;
`;
const ScSearchBtn = styled.button`
  background-color: transparent;
`;
const ScSearchIconImg = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 15px;
  right: 10px;
  opacity: 0.5;
`;

export default KakaoMap;
