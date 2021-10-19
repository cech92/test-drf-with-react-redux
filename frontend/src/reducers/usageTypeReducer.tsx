import { usageTypeConstants } from "../constants/usageTypeConstants";

const initialState = {
  isLoading: false,
  usageTypes: [],
  count: 0,
  usageType: {},
  error: "",
  deleted: false
};

export const usageTypeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case usageTypeConstants.LIST_USAGE_TYPE_REQUEST:
      return { ...state, isLoading: true, deleted: false };
    case usageTypeConstants.LIST_USAGE_TYPE_SUCCESS:
      return { ...state, isLoading: false, usageTypes: action.data.results, count: action.data.count, deleted: false };
    case usageTypeConstants.LIST_USAGE_TYPE_FAILURE:
      return { ...state, isLoading: false, error: action.error, deleted: false };

    case usageTypeConstants.GET_USAGE_TYPE_REQUEST:
      return { ...state, isLoading: true };
    case usageTypeConstants.GET_USAGE_TYPE_SUCCESS:
      return { ...state, isLoading: false, usageType: action.data };
    case usageTypeConstants.GET_USAGE_TYPE_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case usageTypeConstants.DELETE_USAGE_TYPE_REQUEST:
      return { ...state, isLoading: true, deleted: false };
    case usageTypeConstants.DELETE_USAGE_TYPE_SUCCESS:
      return { ...state, isLoading: false, deleted: true };
    case usageTypeConstants.DELETE_USAGE_TYPE_FAILURE:
      return { ...state, isLoading: false, error: action.error, deleted: false };

    case usageTypeConstants.CREATE_USAGE_TYPE_REQUEST:
      return { ...state, isLoading: true };
    case usageTypeConstants.CREATE_USAGE_TYPE_SUCCESS:
      return { ...state, isLoading: false };
    case usageTypeConstants.CREATE_USAGE_TYPE_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

