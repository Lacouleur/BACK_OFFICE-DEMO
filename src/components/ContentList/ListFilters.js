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
} from "../../styles/styledComponents/contentList/ListFilters.sc";
import { setResearchArticle } from "../../store/actions/contentListActions";
import searchIcon from "../../styles/assets/icons/search.svg";
import { fetchResearchedContentsList } from "../../store/actions/thunk/ArticlesActions.thunk";

const ListFilters = ({ filterLang, setFilterLang }) => {
  const dispatch = useDispatch();
  const contentsListState = useSelector(
    ({ contentListReducer }) => contentListReducer
  );
  const [LangOfResearch, setLangOfResearch] = useState([]);
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
          onChange={(e) => dispatch(setResearchArticle(e.target.value))}
          placeholder="search article"
        />
        <ResearchButton
          onClick={() =>
            dispatch(fetchResearchedContentsList(searchedArticle, filterLang))}
        >
          <ResearchIcon src={searchIcon} />
        </ResearchButton>
        <LangOfResearchButton
          classNamePrefix="select"
          closeMenuOnSelect={false}
          isSearchable={false}
          defaultValue={[{ value: "fr", label: "Fr" }]}
          value={LangOfResearch}
          getOptionValue={(option) => `${option.label}`}
          /*  defaultOptions={[
            { value: "fr", label: "Fr" },
            { value: "de", label: "De" },
            { value: "", label: "En" },
          ]} */
          options={[
            { value: "fr", label: "Fr" },
            { value: "de", label: "De" },
            { value: "", label: "En" },
          ]}
          onChange={(event) => setLangOfResearch(event)}
        >
          <ResearchIcon src={searchIcon} />
        </LangOfResearchButton>
      </ResearchFilterBox>
    </FilteringBox>
  );
};

ListFilters.propTypes = {
  filterLang: PropTypes.string.isRequired,
  setFilterLang: PropTypes.func.isRequired,
};

export default ListFilters;
