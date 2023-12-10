import React, {useState} from 'react';
import {Map, MapMarker, MapTypeId} from 'react-kakao-maps-sdk';
import styled from 'styled-components';

function MapDetail({xCoordinate, yCoordinate, name}) {
  const [location, setLocation] = useState({
    // 지도의 초기 위치
    center: {lat: Number(xCoordinate), lng: Number(yCoordinate)},
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });

  return (
    <ScMapWrap>
      <Map // 지도를 표시할 Container
        center={location.center}
        style={{
          // 지도의 크기
          width: '600px',
          height: '600px',
        }}
        level={3} // 지도의 확대 레벨
      >
        <MapMarker // 인포윈도우를 생성하고 지도에 표시합니다
          position={location.center}
          clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        >
          <ScMakerOverlay>{name}</ScMakerOverlay>
        </MapMarker>
      </Map>
    </ScMapWrap>
  );
}

const ScMapWrap = styled.div`
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScMakerOverlay = styled.p`
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  user-select: none;
`;

export default MapDetail;
