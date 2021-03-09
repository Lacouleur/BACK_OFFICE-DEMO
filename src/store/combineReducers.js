import { combineReducers } from "redux";
import homeScreenReducer from "./reducer/homeScreenReducer";
import seoReducer from "./reducer/seoReducer";
import contentListReducer from "./reducer/contentListReducer";
import authReducer from "./reducer/authReducer";
import modulesReducer from "./reducer/modulesReducer";

export default combineReducers({
  homeScreenReducer,
  seoReducer,
  contentListReducer,
  authReducer,
  modulesReducer,
});
