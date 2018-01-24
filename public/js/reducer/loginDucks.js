import axios from 'axios';

const LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_ERROR = 'LOGIN_ERROR';

const loginSuccess = data => ({
    type: LOGIN_SUCCESS,
    payload: {id: data.id, login: data.login, name: data.name}
});

const loginError = data => ({
    type: LOGIN_ERROR,
    payload: data
});

export const login = form => async dispatch => {
    try {
        const res = await axios.post('/api/user', form);

        if (!res.data || res.data === false) {
            dispatch(loginError('Неправильный логин или пароль'));
        } else {
            dispatch(loginSuccess(res.data));
        }
    } catch (e) {
        dispatch(loginError(e.response.data));
    }
};

const initialState = {
    isLoading: false,
    isError: false,
    shouldRedirect: false,
    errorMessage: '',
    user: false,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case LOGIN_SUCCESS:
            sessionStorage.setItem('auth', JSON.stringify(payload));
            return {
                ...state,
                user: payload,
                isLoading: false,
                shouldRedirect: true
            };
        case LOGIN_ERROR:
            return {
                ...state,
                errorMessage: payload,
                isLoading: false,
                isError: true,
            };
        default:
            return state;
    }
}