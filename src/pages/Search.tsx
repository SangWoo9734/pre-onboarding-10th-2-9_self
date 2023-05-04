import { useEffect, useState } from 'react';
import * as S from '../style/search_style';
import { SearchButton, SearchAutoComplete } from '../components/Search';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import {
  decreaseFocusIndex,
  fetchAutoCompleteWordList,
  increaseFocusIndex,
  setFocusIndex,
  setIsCollapsed,
} from '../store/autoCompleteSlice';
import useInputDebounce from '../hooks/useDebounce';

const Search = () => {
  const dispatch = useAppDispatch();
  const [userInput, setUserInput] = useState<string>('');
  const debouncedValue = useInputDebounce(userInput, 500);

  const { focusIndex, isCollapsed } = useAppSelector((state) => state.autoCompleteSlice);
  const autoCompletedSearchWord = useAppSelector(
    (state) => state.autoCompleteSlice.currentAutoCompleteResult.data,
  );

  useEffect(() => {
    if (debouncedValue) {
      dispatch(fetchAutoCompleteWordList(debouncedValue));
      if (debouncedValue.length > 0) dispatch(setIsCollapsed({ isCollapsed: false }));
    }
  }, [debouncedValue]);

  const onChangeUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setUserInput(event.target.value);
  };

  const closeAutoComplete = () => {
    dispatch(setFocusIndex({ index: -1 }));
    dispatch(setIsCollapsed({ isCollapsed: true }));
  };

  const controllWithArrowKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        return dispatch(increaseFocusIndex());

      case 'ArrowUp':
        return dispatch(decreaseFocusIndex());

      case 'Enter':
        if (focusIndex > -1) setUserInput(autoCompletedSearchWord[focusIndex].name);
        return closeAutoComplete();

      case 'Escape':
        return closeAutoComplete();

      default:
        return null;
    }
  };

  return (
    <S.SearchContainer>
      <S.SearchTitle>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </S.SearchTitle>

      <S.SearchInnerContainer>
        <S.SearchBarContainer>
          <S.SearchInputElement
            type="text"
            value={userInput}
            onFocus={() =>
              dispatch(setIsCollapsed({ isCollapsed: userInput.length === 0 || false }))
            }
            onChange={onChangeUserInput}
            onKeyUp={controllWithArrowKey}
          />
          <SearchButton />
        </S.SearchBarContainer>
        {isCollapsed === false && <SearchAutoComplete setUserInput={setUserInput} />}
      </S.SearchInnerContainer>
    </S.SearchContainer>
  );
};

export default Search;
