import * as actions from './loginActions';

export const initialState = {
  isLoading: false,
  isError: false,
  shouldRedirect: false,
  errorMessage: '',
  user: localStorage.getItem('auth'),
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch(type){
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false,
        shouldRedirect: true
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        errorMessage: payload,
        isLoading: false,
        isError: true,
      };
    case actions.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
