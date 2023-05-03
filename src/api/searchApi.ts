import { AxiosResponse } from 'axios';
import { SearchUnitType } from '../@types';
import apiClient from '.';

const getRelatedSearchWord = async (userInput: string) => {
  const callTime = Date.now();
  try {
    const response: AxiosResponse<SearchUnitType[]> = await apiClient.get(`/?name=${userInput}`);

    return { word: userInput, isSuccess: true, data: response.data, message: '', callTime };
  } catch (error) {
    return {
      word: userInput,
      isSuccess: false,
      data: [],
      message: '에러가 발생했습니다.',
      callTime,
    };
  }
};

export default getRelatedSearchWord;
