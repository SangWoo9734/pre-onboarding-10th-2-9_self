import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiResponseType, autoCompleteSliceInitialStateType } from '../@types';
import getRelatedSearchWord from '../api/searchApi';

const initialState: autoCompleteSliceInitialStateType = {
  focusIndex: -1,
  isCollapsed: true,
  currentAutoCompleteResult: {
    word: '',
    isSuccess: false,
    data: [],
    message: '',
    callTime: Date.now(),
  },
  autoCompleteHistory: [],
};

export const fetchAutoCompleteWordList = createAsyncThunk(
  'autoComplete/fetchAutoCompleteWordList',
  async (userInput: string) => {
    try {
      const { data } = await getRelatedSearchWord(userInput);
      return {
        word: userInput,
        isSuccess: true,
        data,
        callTime: Date.now(),
      };
    } catch (error) {
      return {
        word: userInput,
        isSuccess: false,
        data: [],
        message: '에러가 발생했습니다',
        callTime: Date.now(),
      };
    }
  },
);

export const autoCompleteSlice = createSlice({
  name: 'autoComplete',
  initialState,
  reducers: {
    setFocusIndex: (state, action: PayloadAction<{ index: number }>) => {
      state.focusIndex = action.payload.index;
    },
    increaseFocusIndex: (state) => {
      if (state.focusIndex < state.currentAutoCompleteResult.data.length) {
        state.focusIndex += 1;
      } else {
        state.focusIndex = 0;
      }
    },
    decreaseFocusIndex: (state) => {
      if (state.focusIndex > -1) {
        state.focusIndex -= 1;
      } else {
        state.focusIndex = state.currentAutoCompleteResult.data.length - 1;
      }
    },
    setIsCollapsed: (
      state,
      action: PayloadAction<{ isCollapsed: boolean; isUpdateUserInput?: boolean }>,
    ) => {
      state.isCollapsed = action.payload.isCollapsed;
    },
  },
  extraReducers: {
    [fetchAutoCompleteWordList.fulfilled.type]: (state, action: PayloadAction<ApiResponseType>) => {
      state.currentAutoCompleteResult = action.payload;
      state.autoCompleteHistory.push(action.payload);
    },
  },
});

export const { increaseFocusIndex, decreaseFocusIndex, setFocusIndex, setIsCollapsed } =
  autoCompleteSlice.actions;
export default autoCompleteSlice.reducer;
