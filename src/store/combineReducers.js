import { combineReducers } from "redux";
import mainInformationReducer from "./reducer/mainInformationReducer";
import seoReducer from "./reducer/seoReducer";
import contentListReducer from "./reducer/contentListReducer";
import authReducer from "./reducer/authReducer";
import modulesReducer from "./reducer/modulesReducer";
import actionBarReducer from "./reducer/actionBarReducer";
import homeNavigationReducer from "./reducer/homeNavigationReducer";
import manifestoReducer from "./reducer/manifestoReducer";
import pagesHubReducer from "./reducer/pagesHubReducer";
import userReducer from "./reducer/userReducer";
import pageMainInformationReducer from "./reducer/pageEditor/pageMainInformationsReducer";
import pageSeoReducer from "./reducer/pageSeoReducer";
import pageHeaderReducer from "./reducer/pageHeaderReducer";

export default combineReducers({
  mainInformationReducer,
  homeNavigationReducer,
  seoReducer,
  contentListReducer,
  authReducer,
  modulesReducer,
  actionBarReducer,
  manifestoReducer,
  userReducer,
  pagesHubReducer,
  pageMainInformationReducer,
  pageSeoReducer,
  pageHeaderReducer,
});
