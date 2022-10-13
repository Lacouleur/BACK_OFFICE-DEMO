import {
  fetchContentsList,
  fetchResearchedContentsList,
} from "../store/actions/thunk/ArticlesActions.thunk";

export function initList(
  dispatch,
  searchedArticle,
  askedPage,
  filterLang,
  langOfResearch,
  currentPage
) {
  if (searchedArticle === "") {
    dispatch(fetchContentsList(askedPage, undefined, "lang", filterLang));
  }
  if (searchedArticle !== "") {
    dispatch(
      fetchResearchedContentsList(
        searchedArticle,
        filterLang,
        langOfResearch.value,
        currentPage === askedPage ? currentPage : askedPage
      )
    );
  }
}

export function applyFilterAndSearch(
  dispatch,
  searchedArticle,
  askedPage,
  filterLang,
  langOfResearch,
  currentPage
) {
  if (searchedArticle === "" && currentPage) {
    dispatch(fetchContentsList(askedPage, undefined, "lang", filterLang));
  }
  if (searchedArticle !== "") {
    dispatch(
      fetchResearchedContentsList(
        searchedArticle,
        filterLang,
        langOfResearch.value,
        currentPage === askedPage ? currentPage : askedPage
      )
    );
  }
}
