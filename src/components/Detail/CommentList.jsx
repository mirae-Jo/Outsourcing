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
  const [userFilteredMountain, setUserFilteredMountain] = useState([]);

  const dispatch = useDispatch();

  const {user, isloggined} = useSelector(state => state.user_auth);
  const [googleLogin, setGoogleLogin] = useState();
  useEffect(() => {
    getMountains();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (isloggined && user) {
        //추천리스트에 닉네임이 나와야하는데 못나오는중. 이때 authSlice를 통해 값을 업데이트..?
        //이미지 또는 닉네임이 변경되면 유저 정보를 가져옴.
        const userInfo = await getUserInfo(user.uid);
        dispatch(userUpdate(userInfo));
        // dispatch(login(userInfo));
      }
    };

<<<<<<< HEAD
    fetchData();
  }, [dispatch, isloggined, user.uid, user]);
=======
const ScCommentListLayout = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 50px;
>>>>>>> f6c23185ad47fec32257d8f3f8c8dc8e9fe8bae5

  // useEffect(() => {
  //   // onAuthStateChanged를 사용하여 인증 상태 변화 감지
  //   const unsubscribe = onAuthStateChanged(auth, user => {
  //     if (user) {
  //       // 사용자가 로그인한 경우, 사용자 정보 출력
  //       console.log('로그인된 사용자 정보:', user.displayName);
  //       setgoogleLogin(user.displayName);
  //     } else {
  //       // 사용자가 로그아웃한 경우
  //       console.log('사용자 로그아웃');
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

<<<<<<< HEAD
  useEffect(() => {
    if (!data) return;
    const newMountains = [];
    const numbers = []; // 10, 20, 30
=======
  li {
    width: 520px;
    padding: 1rem 1.5rem;
    background-color: white;
    border-radius: 1rem;
    background-color: var(--color-yellow);
>>>>>>> f6c23185ad47fec32257d8f3f8c8dc8e9fe8bae5

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

  useEffect(() => {
    try {
      if (data) {
        const userFilteredMountain = data.filter(
          mountain => mountain.filterlocation === user.region && mountain.difficulty === user.difficulty,
        );
        setUserFilteredMountain(userFilteredMountain);
      }
    } catch (error) {
      console.log(error);
    }
  }, [data, user]);

  return (
    <ScMountainList>
      {isloggined ? (
        userFilteredMountain.length > 0 ? (
          <ScRecommendList>
            <ScTitle>
              <h1>
                <span>{user.displayName}</span>님께 추천드립니다.
              </h1>
              <ScMountainIcon />
            </ScTitle>
            <ScMountainListWarapper>
              {userFilteredMountain.map((item, index) => (
                <MountainCard mountain={item} key={index} />
              ))}
            </ScMountainListWarapper>
          </ScRecommendList>
        ) : (
          <ScNoResultText>
            <p>{user.displayName}님의 지역과 난이도에 일치하는 산이 없습니다.</p>
          </ScNoResultText>
        )
      ) : (
        <ScNoResultText>
          <p>로그인 하시면 맞춤 산을 추천드립니다.</p>
        </ScNoResultText>
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
    color: var(--color-main);
  }
`;

const ScMountainIcon = styled(PiMountainsFill)`
  font-size: 25px;
  color: var(--color-main);
`;

const ScMountainListWarapper = styled.div`
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 auto;
`;

const ScNoResultText = styled.div`
  text-align: center;
  margin: 50px auto;
  width: fit-content;
  background-color: #e8f6ef;
  padding: 15px 30px;
  border-radius: 20px;
`;
