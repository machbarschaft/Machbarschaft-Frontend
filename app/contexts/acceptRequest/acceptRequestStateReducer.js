import { ERROR, HOVER_INDEX, LOADING, MENU_KEY, SELECTED_INDEX, SUCCESS } from './types';

export default function acceptRequestStateReducer(state, action) {
  if (action.type === SUCCESS) {
    return {
      ...state,
      selectedMarkerIndex: -1,
      hoverMarkerIndex: -1,
      mobileMenuKey: 'map',
      loading: false,
      requestList: action.requestList,
      error: null,
    };
  }
  if (action.type === ERROR) {
    return {
      ...state,
      selectedMarkerIndex: -1,
      hoverMarkerIndex: -1,
      mobileMenuKey: 'map',
      loading: false,
      requestList: [],
      error: action.error,
    };
  }
  if (action.type === LOADING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }
  if (action.type === SELECTED_INDEX) {
    return {
      ...state,
      selectedMarkerIndex: action.selectedMarkerIndex,
    };
  }
  if (action.type === HOVER_INDEX) {
    return {
      ...state,
      hoverMarkerIndex: action.hoverMarkerIndex,
    };
  }
  if (action.type === MENU_KEY) {
    return {
      ...state,
      mobileMenuKey: action.mobileMenuKey,
    };
  }
  throw new Error('Unsupported');
}
