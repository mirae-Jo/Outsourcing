import {Map, MapMarker} from 'react-kakao-maps-sdk';
import styled from 'styled-components';

function KakaoMap({location}) {
  // 키워드 입력후 검색 클릭 시 원하는 키워드의 주소로 이동

  return (
    <ScWrap>
      <Map // 지도를 표시할 Container
        center={location.center}
        isPanto={location.isPanto}
        style={{
          // 지도의 크기
          width: '700px',
          height: '430px',
        }}
        level={3} // 지도의 확대 레벨
      >
        {/* <MapTypeId type={'TERRAIN'} // 지도 지형도 표시
         />  */}
        <MapMarker // 인포윈도우를 생성하고 지도에 표시합니다
          position={location.center}
          clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        ></MapMarker>
      </Map>
    </ScWrap>
  );
}

const ScWrap = styled.div`
  width: 700px;
  margin: 20px auto;
`;

export default KakaoMap;
