import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {TiArrowSortedDown} from 'react-icons/ti';
import {useQuery} from '@tanstack/react-query';
import {getMountains} from 'api/mountains';

const DropDown = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState();
  const dropdownRef = useRef(null);

  const dropDownMenu = {
    지역별: [
      '강원도',
      '경기도',
      '경상남도',
      '경상북도',
      '광주광역시',
      '대구광역시',
      '대전광역시',
      '부산광역시',
      '서울특별시',
      '울산광역시',
      '인천광역시',
      '전라남도',
      '전라북도',
      '제주특별자치도',
      '충청남도',
      '충청북도',
    ],
    난이도별: ['초급', '중급', '고급'],
    소요시간별: ['1시간 미만', '1~2시간', '2~3시간', '3~4시간', '4시간 이상'],
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSelectedMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // 클린업
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]); //의존성 배열 사용

  const {isLoading, isError, data} = useQuery({
    queryKey: ['mountains'],
    queryFn: getMountains,
  });

  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  if (isError) {
    return <p>오류가 발생했습니다...</p>;
  }

  if (!data || data.length === 0) {
    return <p>산 정보가 없습니다.</p>;
  }

  return (
    <ScDropDownContainer>
      {Object.keys(dropDownMenu).map((menu, index) => {
        return (
          <ScDropDownWrapper
            key={index}
            ref={dropdownRef}
            onClick={() => {
              setSelectedMenu(selectedMenu === menu ? null : menu);
            }}
          >
            {/**마우스 다운 이벤트 감지 외부or 내부 */}
            <ScBtnWrapper>
              <button>{menu}</button>
              <ScArrowIcon />
            </ScBtnWrapper>
            {selectedMenu === menu && (
              <ScDropDown>
                <ul>
                  {dropDownMenu[menu].map((detailMenu, index) => {
                    return <li key={index}>{detailMenu}</li>;
                  })}
                </ul>
              </ScDropDown>
            )}
          </ScDropDownWrapper>
        );
      })}
    </ScDropDownContainer>
  );
};

export default DropDown;

const ScDropDownContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
`;

const ScDropDownWrapper = styled.div`
  position: relative;
  width: 200px;
  height: fit-content;
  background-color: #f0eeee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #f0eeee;
  user-select: none;
`;

const ScBtnWrapper = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  position: relative;
  & button {
    width: 100%;
    background-color: #f0eeee;
    font-size: medium;
    font-weight: 700;
    padding: 10px;
    position: relative;
    cursor: pointer;
  }
`;

const ScDropDown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7px;
  border: 1px solid #f0eeee;
  background-color: white;
  z-index: 1;
  cursor: pointer;
  & li {
    text-align: center;
    padding: 6px;
    font-weight: 300;
    font-size: 15px;
    transition: background-color 0.3s ease;
  }
  & li:hover {
    color: #1b9c85;
  }
`;

const ScArrowIcon = styled(TiArrowSortedDown)`
  position: absolute;
  left: 85%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 25px;
  color: #1b9c85;
  z-index: 10;
  cursor: pointer;
`;
