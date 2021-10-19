import { userConstants } from '../constants';
import { instance, history } from '../helpers';

export const signInRequest = () => {
    return {
        type: userConstants.SIGN_IN_REQUEST
    }
}

export const signInSuccess = (data: any) => {
    return {
        type: userConstants.SIGN_IN_SUCCESS,
        data: data
    }
}

export const signInFailure = (error: any) => {
    return {
        type: userConstants.SIGN_IN_FAILURE,
        error: error
    }
}

export const refreshTokenRequest = () => {
    return {
        type: userConstants.REFRESH_TOKEN_REQUEST
    }
}

export const refreshTokenSuccess = (data: any) => {
    return {
        type: userConstants.REFRESH_TOKEN_SUCCESS,
        data: data
    }
}

export const refreshTokenFailure = (error: any) => {
    return {
        type: userConstants.REFRESH_TOKEN_FAILURE,
        error: error
    }
}

export const signIn = (data: any) => {
    return async (dispatch: any) => {
        dispatch(signInRequest());
        try {
            let response: any = await instance.post('v1/login', data)
            dispatch(signInSuccess(response.data));
            if (response.data && response.data.access) {
                localStorage.setItem('user', JSON.stringify(response.data));
                history.push('/');
            }
        } catch (error) {
            dispatch(signInFailure(error));
        }
    }
};