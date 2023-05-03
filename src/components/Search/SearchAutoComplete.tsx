import { BiSearch } from 'react-icons/bi';
import { setFocusIndex } from '../../store/autoCompleteSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';

import * as S from '../../style/search_style';

interface Props {
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchAutoComplete = ({ setUserInput }: Props) => {
  const dispatch = useAppDispatch();
  const currentFocusIndex = useAppSelector((state) => state.autoCompleteSlice.focusIndex);
  const autoCompletedSearchWord = useAppSelector(
    (state) => state.autoCompleteSlice.currentAutoCompleteResult.data,
  );

  const focusInUnit = (targetIndex: number) => dispatch(setFocusIndex({ index: targetIndex }));
  const focusOutUnit = () => dispatch(setFocusIndex({ index: -1 }));

  return (
    <S.SearchAutoCompleteContainer>
      <S.SearchRelatedWordNotice>추천 검색어</S.SearchRelatedWordNotice>
      {autoCompletedSearchWord.map((word, index) => (
        <S.SearchAutoCompleteUnit
          key={word.id}
          isFocus={index === currentFocusIndex}
          onClick={() => setUserInput(autoCompletedSearchWord[currentFocusIndex].name)}
          onMouseOver={() => focusInUnit(index)}
          onMouseLeave={() => focusOutUnit()}
        >
          <BiSearch />
          <p>{word.name}</p>
        </S.SearchAutoCompleteUnit>
      ))}
    </S.SearchAutoCompleteContainer>
  );
};

export default SearchAutoComplete;
