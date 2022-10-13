import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  FilteringBox,
  LangFilter,
  LangOfResearchButton,
  OptionFilter,
  ResearchButton,
  ResearchFilterBox,
  ResearchFilterField,
  ResearchIcon,
  CloseIcon,
  CloseButton,
} from "../../styles/styledComponents/contentList/ListFilters.sc";
import {
  setAskedPage,
  setFilterLang,
  setLangOfResearch,
  setResearchArticle,
} from "../../store/actions/contentListActions";
import searchIcon from "../../styles/assets/icons/search.svg";
import crossPurpleIcon from "../../styles/assets/icons/cross-purple.svg";
import {
  fetchContentsList,
  fetchResearchedContentsList,
} from "../../store/actions/thunk/ArticlesActions.thunk";

const ListFilters = ({ filterLang, langOfResearch, searchedArticle }) => {
  const dispatch = useDispatch();
  const searchField = React.useRef(null);

  const LangOfResearchOptions = [
    { value: "fr", label: "Fr 🇫🇷" },
    { value: "de", label: "De 🇩🇪" },
    { value: "en", label: "En 🇬🇧" },
  ];

  return (
    <FilteringBox>
      <LangFilter>
        <OptionFilter
          first
          selected={filterLang === "fr"}
          onClick={() => {
            dispatch(setAskedPage(1));
            dispatch(setFilterLang("fr"));
          }}
        >
          FR
        </OptionFilter>
        <OptionFilter
          selected={filterLang === "de"}
          onClick={() => {
            dispatch(setAskedPage(1));
            dispatch(setFilterLang("de"));
          }}
        >
          DE
        </OptionFilter>
        <OptionFilter
          last
          selected={filterLang === ""}
          onClick={() => {
            dispatch(setAskedPage(1));
            dispatch(setFilterLang(""));
          }}
        >
          ALL
        </OptionFilter>
      </LangFilter>

      <ResearchFilterBox>
        <ResearchFilterField
          ref={searchField}
          onChange={(e) => dispatch(setResearchArticle(e.target.value))}
          defaultValue={searchedArticle || ""}
          onKeyPress={(e) => {
            if (e.key === "Enter" && e.target.value !== "") {
              dispatch(
                fetchResearchedContentsList(
                  e.target.value,
                  filterLang,
                  langOfResearch.value,
                  1
                )
              );
            }
          }}
          placeholder="search article"
        />

        <ResearchButton
          onClick={() => {
            dispatch(
              fetchResearchedContentsList(
                searchedArticle,
                filterLang,
                langOfResearch.value,
                1
              )
            );
          }}
        >
          <ResearchIcon src={searchIcon} />
        </ResearchButton>

        <CloseButton>
          {searchedArticle !== "" && (
            <CloseIcon
              onClick={() => {
                searchField.current.value = "";
                dispatch(setResearchArticle(""));
                dispatch(fetchContentsList(1, undefined, "lang", filterLang));
              }}
              src={crossPurpleIcon}
            />
          )}
        </CloseButton>
        <LangOfResearchButton
          classNamePrefix="selectFlag"
          closeMenuOnSelect
          isClearable
          isSearchable={false}
          defaultValue={langOfResearch}
          getOptionValue={(option) => `${option.label}`}
          options={LangOfResearchOptions}
          onChange={(event) => {
            dispatch(setLangOfResearch(event));
          }}
        />
      </ResearchFilterBox>
    </FilteringBox>
  );
};

ListFilters.propTypes = {
  filterLang: PropTypes.string.isRequired,
  langOfResearch: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  searchedArticle: PropTypes.string.isRequired,
};

export default ListFilters;
