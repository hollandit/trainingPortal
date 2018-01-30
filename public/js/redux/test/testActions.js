import axios from 'axios';

export const TEST_REQUEST = 'TEST_REQUEST',
    TEST_ERROR = 'TEST_ERROR',
    TEST_THEME = 'TEST_THEME';

export const themeSuccess = data => {
    const theme = {item: [Object.values(data)]};

    return {
        type: TEST_THEME,
        preload: theme
    };
};

export const themeError = data => {
    return {
        type: TEST_ERROR,
        preload: data
    };
};

export const theme = data => async dispatch => {
    try {
        const res = await axios.get('/api/test-thema');

        if(!res.data || res.data === false){
            dispatch(themeError('Возникла ошибка'))
        } else {
            dispatch(themeSuccess(res.data));
        }
    } catch (e) {
        dispatch(themeError(e.resolve.data));
    }
};