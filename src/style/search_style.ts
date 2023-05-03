import styled from 'styled-components';

export const SearchContainer = styled.div`
  height: 100vh;
  margin: 0 20px;
`;

export const SearchInnerContainer = styled.div`
  position: relative;
`;

export const SearchTitle = styled.p`
  margin-bottom: 40px;
  padding-top: 60px;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 1.6;
  text-align: center;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  flex: 0 1 auto;
  width: 100%;
  height: 60px;
  border-radius: 50px;
  font-size: 1.6rem;
  font-weight: bold;
  overflow: hidden;
`;

export const SearchInputElement = styled.input`
  display: flex;
  width: calc(100% - 90px);
  height: 100%;
  padding: 0 30px;
  border: 0;

  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  width: 90px;
  height: 100%;
  color: white;
  background-color: #3579e1;
`;

export const SearchAutoCompleteContainer = styled.div`
  position: absolute;
  top: 1;
  width: 100%;
  max-height: 400px;
  margin-top: 10px;
  padding: 10px 0;
  background-color: white;
  border-radius: 20px;
  overflow: scroll;
`;

export const SearchRelatedWordNotice = styled.p`
  padding: 10px 20px;
  color: gray;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const SearchAutoCompleteUnit = styled.div<{ isFocus: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 1.5rem;

  background-color: ${(props) => (props.isFocus ? 'lightgray' : 'white')};

  & > svg {
    margin-right: 10px;
    color: gray;
  }
`;
