import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
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
import { setResearchArticle } from "../../store/actions/contentListActions";
import searchIcon from "../../styles/assets/icons/search.svg";
import crossPurpleIcon from "../../styles/assets/icons/cross-purple.svg";
import { fetchResearchedContentsList } from "../../store/actions/thunk/ArticlesActions.thunk";

const ListFilters = ({ filterLang, setFilterLang }) => {
  const dispatch = useDispatch();
  const searchField = React.useRef(null);
  const contentsListState = useSelector(
    ({ contentListReducer }) => contentListReducer
  );
  const [LangOfResearch, setLangOfResearch] = useState([
    { value: "", label: "En 🇬🇧" },
  ]);

  const LangOfResearchOptions = [
    { value: "fr", label: "Fr 🇫🇷" },
    { value: "de", label: "De 🇩🇪" },
    { value: "", label: "En 🇬🇧" },
  ];

  const { searchedArticle } = contentsListState;
  return (
    <FilteringBox>
      <LangFilter>
        <OptionFilter
          first
          selected={filterLang === "fr"}
          onClick={() => setFilterLang("fr")}
        >
          FR
        </OptionFilter>
        <OptionFilter
          selected={filterLang === "de"}
          onClick={() => setFilterLang("de")}
        >
          DE
        </OptionFilter>
        <OptionFilter
          last
          selected={filterLang === ""}
          onClick={() => setFilterLang("")}
        >
          ALL
        </OptionFilter>
      </LangFilter>

      <ResearchFilterBox>
        <ResearchFilterField
          ref={searchField}
          onChange={(e) => dispatch(setResearchArticle(e.target.value))}
          placeholder="search article"
        />

        <ResearchButton
          onClick={() =>
            dispatch(fetchResearchedContentsList(searchedArticle, filterLang))}
        >
          <ResearchIcon src={searchIcon} />
          {console.warn(LangOfResearchOptions[2])}
        </ResearchButton>

        <CloseButton>
          {searchedArticle !== "" && (
            <CloseIcon
              onClick={() => {
                console.warn("Searched value", searchField.current.value);
                searchField.current.value = "";
                dispatch(setResearchArticle(""));
              }}
              src={crossPurpleIcon}
            />
          )}
        </CloseButton>
        <LangOfResearchButton
          classNamePrefix="selectFlag"
          closeMenuOnSelect={false}
          isClearable
          isSearchable={false}
          value={LangOfResearch}
          getOptionValue={(option) => `${option.label}`}
          options={LangOfResearchOptions}
          onChange={(event) => setLangOfResearch(event)}
        />
      </ResearchFilterBox>
    </FilteringBox>
  );
};

ListFilters.propTypes = {
  filterLang: PropTypes.string.isRequired,
  setFilterLang: PropTypes.func.isRequired,
};

export default ListFilters;
