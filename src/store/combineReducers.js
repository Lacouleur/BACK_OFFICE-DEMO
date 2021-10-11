import { combineReducers } from "redux";
import mainInformationReducer from "./reducer/mainInformationReducer";
import seoReducer from "./reducer/seoReducer";
import contentListReducer from "./reducer/contentListReducer";
import authReducer from "./reducer/authReducer";
import modulesReducer from "./reducer/modulesReducer";
import actionBarReducer from "./reducer/actionBarReducer";
import homeNavigationReducer from "./reducer/homeNavigationReducer";
import manifestoReducer from "./reducer/manifestoReducer";
import userPanelReducer from "./reducer/UserPanelReducer";

export default combineReducers({
  mainInformationReducer,
  homeNavigationReducer,
  seoReducer,
  contentListReducer,
  authReducer,
  modulesReducer,
  actionBarReducer,
  manifestoReducer,
  userPanelReducer,
});
