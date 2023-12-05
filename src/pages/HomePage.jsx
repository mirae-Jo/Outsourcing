import React, {useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://dapi.kakao.com/v2/maps/sdk.js`, {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
          },
        });

        console.log(response.data);
        // 여기에서 가져온 데이터를 사용하여 원하는 동작 수행
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ScKaKaoMap>카카오맵</ScKaKaoMap>;
    </>
  );
};

const ScKaKaoMap = styled.div`
  width: 500px;
  height: 400px;
`;

export default Home;
