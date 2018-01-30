import * as actions from './testActions';

export const initialState = {
    isLoading: false,
    isError: false,
    errorMessage: '',
    thema: localStorage.getItem('thema')
};

export default (state = initialState, action) => {
    const {type, payload } = action;

    switch (type) {
        case actions.TEST_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case actions.TEST_THEME:
            return {
                ...state,
                isLoading: false,
                isError: false,
                thema: payload
            };
        case actions.TEST_ERROR:
            return {
                ...state,
                isError: true,
                isLoading: false,
                errorMessage: payload
            };
        default:
            return state;
    }
};