import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Detail() {
  const [mountain, setMountain] = useState({});



  useEffect(() => {
    const getMoutainInfo = async () => {
      const response = await axios.get('http://openapi.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice?mntnNm=%EA%B4%80%EC%95%85%EC%82%B0&serviceKey=mOcYCMswMlrIpL9Ne3YN%2B%2BSE7OGKAm4vgyh5hH5WRj4p%2Bc5kcbpz6JrPOwe3LiKkbAFtoNcIIc4jiMFFi0oHDQ%3D%3D')
      console.log(response);
      const { mntnnm, mntnattchimageseq, mntninfopoflc, mntninfodtlinfocont, mntninfohght
      } = response.data.response.body.items.item;
      setMountain({
        mntnnm, mntnattchimageseq, mntninfopoflc, mntninfodtlinfocont, mntninfohght
      })
    }
    getMoutainInfo();



    // const { mntninfopoflc } = response.data.response.body.items;
    // setMountain(mntninfopoflc)
  }, [])
  console.log(mountain);

  return (
    <>
      <h1>{mountain.mntnnm}</h1>
      <img src={mountain.mntnattchimageseq} alt='mountain' />
      <img src='http://www.forest.go.kr/newkfsweb/cmm/fms/getImage.do?fileSn=1&atchFileId=FILE_000000000423899' />
      <img src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMjhfNTAg%2FMDAxNjk4NDg3MjA2ODAw.Jf5cPL1PLXVjGLIQIAJNiL41rkQ1ZblZ8vYAtVQaxkUg.hS_MMHPKmqGgkgjBXYMzEoiptXlcdv5-3raMMDqMkdAg.JPEG.giojbh5022%2F1698483195233.jpg&type=sc960_832' />
      <div> 위치 : {mountain.mntninfopoflc}</div>
      <p>고도 : {mountain.mntninfohght}m</p>
      <p>난이도 : </p>
    </>
  );
}

export default Detail;
