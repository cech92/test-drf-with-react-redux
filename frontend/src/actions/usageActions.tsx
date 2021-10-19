import { usageConstants } from '../constants';
import { instance, buildGet } from '../helpers';

export const listUsageRequest = () => {
    return {
        type: usageConstants.LIST_USAGE_REQUEST
    }
}

export const listUsageSuccess = (data: any) => {
    return {
        type: usageConstants.LIST_USAGE_SUCCESS,
        data: data
    }
}

export const listUsageFailure = (error: any) => {
    return {
        type: usageConstants.LIST_USAGE_FAILURE,
        error: error
    }
}

export const getUsageRequest = () => {
    return {
        type: usageConstants.GET_USAGE_REQUEST
    }
}

export const getUsageSuccess = (data: any) => {
    return {
        type: usageConstants.GET_USAGE_SUCCESS,
        data: data
    }
}

export const getUsageFailure = (error: any) => {
    return {
        type: usageConstants.GET_USAGE_FAILURE,
        error: error
    }
}

export const deleteUsageRequest = () => {
    return {
        type: usageConstants.DELETE_USAGE_REQUEST
    }
}

export const deleteUsageSuccess = (id: BigInteger) => {
    return {
        type: usageConstants.DELETE_USAGE_SUCCESS,
        id: id
    }
}

export const deleteUsageFailure = (error: any) => {
    return {
        type: usageConstants.DELETE_USAGE_FAILURE,
        error: error
    }
}

export const createUsageRequest = () => {
    return {
        type: usageConstants.CREATE_USAGE_REQUEST
    }
}

export const createUsageSuccess = (data: any) => {
    return {
        type: usageConstants.CREATE_USAGE_SUCCESS,
        data: data
    }
}

export const createUsageFailure = (error: any) => {
    return {
        type: usageConstants.CREATE_USAGE_FAILURE,
        error: error
    }
}

export const getUsageList = (data: any) => {
    return async (dispatch: any) => {
        dispatch(listUsageRequest());
        try {
            let path = buildGet('v1/usages', data);
            let response: any = await instance.get(path, data)
            dispatch(listUsageSuccess(response.data));
        } catch (error) {
            dispatch(listUsageFailure(error));
        }
    }
};

export const getUsage = (id: BigInteger) => {
    return async (dispatch: any) => {
        dispatch(getUsageRequest());
        try {
            let response: any = await instance.get('v1/usages/' + id)
            dispatch(getUsageSuccess(response.data));
        } catch (error) {
            dispatch(getUsageFailure(error));
        }
    }
};

export const deleteUsage = (id: BigInteger) => {
    return async (dispatch: any) => {
        dispatch(deleteUsageRequest());
        try {
            await instance.delete('v1/usages/' + id)
            dispatch(deleteUsageSuccess(id));
        } catch (error) {
            dispatch(deleteUsageFailure(error));
        }
    }
};

export const createUsage = (data: any) => {
    return async (dispatch: any) => {
        dispatch(createUsageRequest());
        try {
            let response: any = await instance.post('v1/usages', JSON.stringify(data))
            dispatch(createUsageSuccess(response.data));
        } catch (error) {
            dispatch(createUsageFailure(error));
        }
    }
};