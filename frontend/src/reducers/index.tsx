import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { usageReducer } from "./usageReducer";
import { usageTypeReducer } from "./usageTypeReducer";

const rootReducer = combineReducers({
  user: userReducer,
  usages: usageReducer,
  usageTypes: usageTypeReducer,
});

export default rootReducer;