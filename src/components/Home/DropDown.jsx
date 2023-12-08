import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {TiArrowSortedDown} from 'react-icons/ti';
import FilteredMountain from './FilteredMountain';

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDetailCategory, setSelectedDetailCategory] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // 클린업
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <ScDropDownContainer ref={dropdownRef}>
        {/* <ScDropDownContainer> */}
        {Object.keys(DROPDOWN_MENU).map((category, index) => {
          return (
            <ScDropDownWrapper key={index}>
              {/**마우스 다운 이벤트 감지 외부or 내부 */}
              <ScBtnWrapper
                onClick={() => {
                  setIsOpen(true);
                  setSelectedCategory(category);
                }}
              >
                <button>{category}</button>
                <ScArrowIcon />
              </ScBtnWrapper>

              {isOpen && selectedCategory === category && (
                <ScDropDown>
                  <ul>
                    {DROPDOWN_MENU[category].map((detailCategory, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            setIsOpen(false);
                            setSelectedDetailCategory(detailCategory);
                          }}
                        >
                          {detailCategory}
                        </li>
                      );
                    })}
                  </ul>
                </ScDropDown>
              )}
            </ScDropDownWrapper>
          );
        })}
      </ScDropDownContainer>
      {selectedDetailCategory && (
        <FilteredMountain
          DROPDOWN_MENU={DROPDOWN_MENU}
          selectedCategory={selectedCategory}
          selectedDetailCategory={selectedDetailCategory}
        />
      )}
    </>
  );
};

export default DropDown;

const DROPDOWN_MENU = {
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
