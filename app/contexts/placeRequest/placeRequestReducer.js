import { ERROR, LOADED, NEXT_PAGE, PREV_PAGE, VALIDATING } from './types';

export default function placeRequestReducer(state, action) {
  switch (action.type) {
    case LOADED:
      return {
        ...state,
        isLoading: false,
      };
    case VALIDATING:
      return {
        ...state,
        isValidating: true,
        hasError: false,
        errorMsg: '',
      };
    case ERROR:
      return {
        ...state,
        isValidating: false,
        hasError: true,
        errorMsg: action.data,
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case PREV_PAGE:
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    default:
      throw new Error('Unsupported Type');
  }
}
