import { usageConstants } from "../constants/usageConstants";

const initialState = {
  isLoading: false,
  usages: [],
  count: 0,
  usage: {},
  error: "",
  deleted: false,
  created: false
};

export const usageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case usageConstants.LIST_USAGE_REQUEST:
      return { ...state, isLoading: true, deleted: false, created: false };
    case usageConstants.LIST_USAGE_SUCCESS:
      return { ...state, isLoading: false, usages: action.data.results, count: action.data.count, deleted: false, created: false };
    case usageConstants.LIST_USAGE_FAILURE:
      return { ...state, isLoading: false, error: action.error, deleted: false, created: false };

    case usageConstants.GET_USAGE_REQUEST:
      return { ...state, isLoading: true };
    case usageConstants.GET_USAGE_SUCCESS:
      return { ...state, isLoading: false, usage: action.data };
    case usageConstants.GET_USAGE_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case usageConstants.DELETE_USAGE_REQUEST:
      return { ...state, isLoading: true, deleted: false };
    case usageConstants.DELETE_USAGE_SUCCESS:
      return { ...state, isLoading: false, deleted: true };
    case usageConstants.DELETE_USAGE_FAILURE:
      return { ...state, isLoading: false, error: action.error, deleted: false };

    case usageConstants.CREATE_USAGE_REQUEST:
      return { ...state, isLoading: true, created: false };
    case usageConstants.CREATE_USAGE_SUCCESS:
      return { ...state, isLoading: false, usage: action.data, created: true };
    case usageConstants.CREATE_USAGE_FAILURE:
      return { ...state, isLoading: false, error: action.error, created: false };
    default:
      return state;
  }
};

