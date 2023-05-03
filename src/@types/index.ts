export interface SearchUnitType {
  id: number;
  name: string;
}

export interface ApiResponseType {
  word: string;
  isSuccess: boolean;
  data: SearchUnitType[];
  message?: string;
  callTime: number;
}

export interface autoCompleteSliceInitialStateType {
  focusIndex: number;
  isCollapsed: boolean;
  currentAutoCompleteResult: ApiResponseType;
  autoCompleteHistory: ApiResponseType[];
}
