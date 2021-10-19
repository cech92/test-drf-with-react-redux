import { usageTypeConstants } from '../constants';
import { instance, buildGet } from '../helpers';

export const listUsageTypeRequest = () => {
    return {
        type: usageTypeConstants.LIST_USAGE_TYPE_REQUEST,
    }
}

export const listUsageTypeSuccess = (data: any) => {
    return {
        type: usageTypeConstants.LIST_USAGE_TYPE_SUCCESS,
        data: data
    }
}

export const listUsageTypeFailure = (error: any) => {
    return {
        type: usageTypeConstants.LIST_USAGE_TYPE_FAILURE,
        error: error
    }
}

export const getUsageTypeRequest = () => {
    return {
        type: usageTypeConstants.GET_USAGE_TYPE_REQUEST
    }
}

export const getUsageTypeSuccess = (data: any) => {
    return {
        type: usageTypeConstants.GET_USAGE_TYPE_SUCCESS,
        data: data
    }
}

export const getUsageTypeFailure = (error: any) => {
    return {
        type: usageTypeConstants.GET_USAGE_TYPE_FAILURE,
        error: error
    }
}

export const deleteUsageTypeRequest = () => {
    return {
        type: usageTypeConstants.DELETE_USAGE_TYPE_REQUEST
    }
}

export const deleteUsageTypeSuccess = (id: BigInteger) => {
    return {
        type: usageTypeConstants.DELETE_USAGE_TYPE_SUCCESS,
        id: id
    }
}

export const deleteUsageTypeFailure = (error: any) => {
    return {
        type: usageTypeConstants.DELETE_USAGE_TYPE_FAILURE,
        error: error
    }
}

export const createUsageTypeRequest = () => {
    return {
        type: usageTypeConstants.CREATE_USAGE_TYPE_REQUEST
    }
}

export const createUsageTypeSuccess = (data: any) => {
    return {
        type: usageTypeConstants.CREATE_USAGE_TYPE_SUCCESS,
        data: data
    }
}

export const createUsageTypeFailure = (error: any) => {
    return {
        type: usageTypeConstants.CREATE_USAGE_TYPE_FAILURE,
        error: error
    }
}

export const getUsageTypeList = (data: any) => {
    return async (dispatch: any) => {
        dispatch(listUsageTypeRequest());
        try {
            let path = buildGet('v1/usage-types', data);
            let response: any = await instance.get(path, data)
            dispatch(listUsageTypeSuccess(response.data));
        } catch (error) {
            dispatch(listUsageTypeFailure(error));
        }
    }
};

export const getUsageType = (id: BigInteger) => {
    return async (dispatch: any) => {
        dispatch(getUsageTypeRequest());
        try {
            let response: any = await instance.get('v1/usage-types/' + id)
            dispatch(getUsageTypeSuccess(response.data));
        } catch (error) {
            dispatch(getUsageTypeFailure(error));
        }
    }
};

export const deleteUsageType = (id: BigInteger) => {
    return async (dispatch: any) => {
        dispatch(deleteUsageTypeRequest());
        try {
            await instance.delete('v1/usage-types/' + id)
            dispatch(deleteUsageTypeSuccess(id));
        } catch (error) {
            dispatch(deleteUsageTypeFailure(error));
        }
    }
};

export const createUsageType = (data: any) => {
    return async (dispatch: any) => {
        dispatch(createUsageTypeRequest());
        try {
            let response: any = await instance.delete('v1/usage-types', data)
            dispatch(createUsageTypeSuccess(response.data));
        } catch (error) {
            dispatch(createUsageTypeFailure(error));
        }
    }
};