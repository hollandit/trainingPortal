import axios from 'axios';

const LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_ERROR = 'LOGIN_ERROR',
    LOGOUT = 'LOGOUT';

export const loginSuccess = data => {
    const user = {id: data.id, login: data.login, name: data.name};

    sessionStorage.setItem('auth', JSON.stringify(user));

    return{
        type: LOGIN_SUCCESS,
        payload: user
    }
};

export const loginError = data => {
    sessionStorage.removeItem('auth');

    return {
        type: LOGIN_ERROR,
        payload: data
    };
};

export const logout = () => {
    sessionStorage.removeItem('auth');
    return {};
};

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