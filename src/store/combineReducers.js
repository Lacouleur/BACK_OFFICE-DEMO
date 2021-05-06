import { combineReducers } from "redux";
import mainInformationReducer from "./reducer/mainInformationReducer";
import seoReducer from "./reducer/seoReducer";
import contentListReducer from "./reducer/contentListReducer";
import authReducer from "./reducer/authReducer";
import modulesReducer from "./reducer/modulesReducer";
import actionBarReducer from "./reducer/actionBarReducer";

export default combineReducers({
  mainInformationReducer,
  seoReducer,
  contentListReducer,
  authReducer,
  modulesReducer,
  actionBarReducer,
});
