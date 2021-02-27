import { VALIDATE_FAILURE, VALIDATE_START, VALIDATE_SUCCESS } from './types';

export default function ValidatePhoneReducer(state, action) {
  switch (action.type) {
    case VALIDATE_START:
      return {
        ...state,
        validateFailure: false,
        validateSuccess: false,
      };
    case VALIDATE_SUCCESS:
      return {
        ...state,
        validateFailure: false,
        validateSuccess: true,
      };
    case VALIDATE_FAILURE:
      return {
        ...state,
        validateSuccess: false,
        validateFailure: true,
        validateErrorMsg: action.data.validateErrorMsg,
      };
    default:
      throw Error('Unsupported Type');
  }
}
