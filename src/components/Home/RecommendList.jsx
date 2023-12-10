import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {PiMountainsFill} from 'react-icons/pi';
import {useQuery} from '@tanstack/react-query';
import MountainCard from 'common/MountainCard';
import {getMountains} from 'common/api/mountains';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInfo} from 'shared/firebase';
import {login, userUpdate} from 'shared/redux/modules/authSlice';
const ITEM_COUNT = 4;

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const RecommendList = () => {
  const [mountains, setMountains] = useState([]);
  const [personalMountain, setPersonalMountain] = useState([]);
  const {isLoading, isError, data} = useQuery({
    queryKey: ['mountains'],
    queryFn: getMountains,
  });

  const dispatch = useDispatch();

  const {user, isloggined} = useSelector(state => state.user_auth);
  const [googleLogin, setGoogleLogin] = useState();
  useEffect(() => {
    getMountains();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isloggined) {
        //추천리스트에 닉네임이 나와야하는데 못나오는중. 이때 authSlice를 통해 값을 업데이트..?
        //이미지 또는 닉네임이 변경되면 유저 정보를 가져옴.
        const userInfo = await getUserInfo(user.uid);
        dispatch(userUpdate(userInfo));
      }
    };

    fetchData();
  }, [dispatch, isloggined, user.uid]);

  useEffect(() => {
    if (!data) return;
    const newMountains = [];
    const numbers = []; // 10, 20, 30

    for (let i = 0; i < ITEM_COUNT; i++) {
      let randomNumber = getRandomInt(0, data.length);
      while (numbers.includes(randomNumber)) {
        randomNumber = getRandomInt(0, data.length);
      }
      numbers.push(randomNumber);
      newMountains.push(data[randomNumber]);
    }

    setPersonalMountain(newMountains);
  }, [data]);

  // mountain
  useEffect(() => {
    if (!data) return;

    const updateMountains = () => {
      const newMountains = [];
      const numbers = []; // 10, 20, 30

      for (let i = 0; i < ITEM_COUNT; i++) {
        let randomNumber = getRandomInt(0, data.length);
        while (numbers.includes(randomNumber)) {
          randomNumber = getRandomInt(0, data.length);
        }
        numbers.push(randomNumber);
        newMountains.push(data[randomNumber]);
      }

      setMountains(newMountains);
    };
    updateMountains();
    const interval = setInterval(updateMountains, 10000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <ScMountainList>
      {isloggined && (
        <ScRecommendList>
          <ScTitle>
            <h1>
              <span>{user.displayName}</span>님께 추천드립니다.
            </h1>
            <ScMountainIcon />
          </ScTitle>
          <ScMountainListWarapper>
            {personalMountain.map((item, index) => (
              <MountainCard mountain={item} />
            ))}
          </ScMountainListWarapper>
        </ScRecommendList>
      )}
      <ScRecommendList>
        <ScTitle>
          <h1>
            <span>한사랑 산악회 </span>추천 산
          </h1>
          <ScMountainIcon />
        </ScTitle>
        <ScMountainListWarapper>
          {mountains.map((item, index) => (
            <MountainCard mountain={item} key={index} />
          ))}
        </ScMountainListWarapper>
      </ScRecommendList>
    </ScMountainList>
  );
};

export default RecommendList;

const ScMountainList = styled.div`
  padding-bottom: 50px;
`;

const ScRecommendList = styled.div`
  max-width: 120%;
  width: 920px;
  margin: 20px auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  user-select: none;
`;

const ScTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 8px;
  & h1 {
    font-size: large;
  }
  & span {
    color: #1b9c85;
  }
`;

const ScMountainIcon = styled(PiMountainsFill)`
  font-size: 25px;
  color: #1b9c85;
`;

const ScMountainListWarapper = styled.div`
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 auto;
`;
