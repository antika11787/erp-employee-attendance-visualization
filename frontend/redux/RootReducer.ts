import fileReducer from "./slices/FileSlice";
import contentReducer from "./slices/ContentSlice";
import userReducer from "./slices/UserSlice";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  file: fileReducer,
  content: contentReducer,
  user: userReducer,
});

export default rootReducer;
