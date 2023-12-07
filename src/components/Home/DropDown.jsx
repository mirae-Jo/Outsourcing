import React, {useState} from 'react';
import styled from 'styled-components';
import {TiArrowSortedDown} from 'react-icons/ti';

const DropDown = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const dropDownMenu = {
    site: ['서울', '경기', '대전'],
    difficulty: ['상', '중', '하'],
    time: ['1시간', '2시간', '3시간'],
  };

  return (
    <ScDropDownContainer>
      {Object.keys(dropDownMenu).map((menu, index) => {
        return (
          <ScDropDownWrapper key={index}>
            <ScBtnWrapper>
              <button>{menu}</button>
              <ScArrowIcon
                onClick={() => {
                  setSelectedMenu(selectedMenu === menu ? null : menu);
                }}
              />
            </ScBtnWrapper>

            {selectedMenu === menu && (
              <ScDropDowon>
                <ul>
                  {dropDownMenu[menu].map((detailMenu, index) => {
                    return <li key={index}>{detailMenu}</li>;
                  })}
                </ul>
              </ScDropDowon>
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
  width: 200px;
  height: fit-content;
  background-color: #f0eeee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #f0eeee;
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
    cursor: default;
  }
`;

const ScDropDowon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7px;
  border: 1px solid #f0eeee;
  background-color: white;
  & li {
    padding: 6px;
    font-weight: 300;
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
