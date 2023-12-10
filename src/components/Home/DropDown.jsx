import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {TiArrowSortedDown} from 'react-icons/ti';
import FilteredMountain from './FilteredMountain';
import {MdOutlineCancel} from 'react-icons/md';

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedDetailCategories, setSelectedDetailCategories] = useState({});
  const dropdownRef = useRef(null);

  const DROPDOWN_MENU = {
    region: [
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
    difficulty: ['초급', '중급', '고급'],
    duration: ['1시간 미만', '1~2시간', '2~3시간', '3~4시간', '4시간 이상'],
  };

  const displayName = {
    region: '지역별',
    difficulty: '난이도별',
    duration: '소요시간별',
  };

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

  const handleFilterCancleClick = category => {
    setSelectedDetailCategories(prev => {
      const updatedDetailCategories = {...prev};
      delete updatedDetailCategories[category];
      return updatedDetailCategories;
    });
  };

  return (
    <>
      <ScDropDownContainer ref={dropdownRef}>
        {Object.keys(DROPDOWN_MENU).map((category, index) => {
          return (
            <ScDropDownWrapper key={index}>
              <ScBtnWrapper
                onClick={() => {
                  setIsOpen(true);
                  setSelectedCategories({[category]: true});
                }}
              >
                <button>{displayName[category]}</button>
                <ScArrowIcon />
              </ScBtnWrapper>
              {isOpen && selectedCategories[category] && (
                <ScDropDown>
                  <ul>
                    {DROPDOWN_MENU[category].map((detailCategory, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            setIsOpen(false);
                            setSelectedDetailCategories(prev => ({
                              ...prev,
                              [category]: detailCategory,
                            }));
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

      {/* 필터 태그 구현 */}
      <ScCategoryWrapper>
        {console.log(selectedDetailCategories)}
        {Object.keys(selectedDetailCategories).map(
          category =>
            selectedDetailCategories[category] && (
              <ScDetailCategoryTag key={category}>
                {selectedDetailCategories[category]} <ScCancleIcon onClick={() => handleFilterCancleClick(category)} />
              </ScDetailCategoryTag>
            ),
        )}
      </ScCategoryWrapper>

      {Object.keys(selectedDetailCategories).length > 0 && (
        <FilteredMountain
          selectedCategories={Object.keys(selectedDetailCategories)}
          selectedDetailCategories={selectedDetailCategories}
        />
      )}
    </>
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
  background-color: var(--color-main);
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
    color: var(--color-main);
  }
`;

const ScArrowIcon = styled(TiArrowSortedDown)`
  position: absolute;
  left: 85%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 25px;
  color: var(--color-main);
  z-index: 10;
  cursor: pointer;
`;

const ScCategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const ScDetailCategoryTag = styled.p`
  width: fit-content;
  padding: 5px 15px;
  border-radius: 20px;
  color: white;
  background-color: var(--color-main);
  display: flex;
  align-items: center;
`;

const ScCancleIcon = styled(MdOutlineCancel)`
  margin-left: 4px;
  cursor: pointer;
`;
