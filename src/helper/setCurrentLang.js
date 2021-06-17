import langList from "./langList";
import { selectManifestoLang } from "../store/actions/manifestoActions";

function setCurrentLang(dispatch, lang) {
  langList.map((option) => {
    if (lang === option.value) {
      dispatch(selectManifestoLang(option));
    }
    return null;
  });
}

export default setCurrentLang;
