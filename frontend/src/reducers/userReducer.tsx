import { userConstants } from "../constants/userConstants";

let user = localStorage.getItem('user');

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user!) : {},
  error: "",
  success: false
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case userConstants.SIGN_IN_REQUEST:
      return { ...state, isLoading: true, success: false, error: "" };
    case userConstants.SIGN_IN_SUCCESS:
      return { ...state, isLoading: false, user: action.data, success: true, error: "" };
    case userConstants.SIGN_IN_FAILURE:
      return { ...state, isLoading: false, error: true, success:false };
    default:
      return state;
  }
};