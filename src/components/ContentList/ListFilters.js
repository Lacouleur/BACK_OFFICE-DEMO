import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  FilteringBox,
  LangFilter,
  OptionFilter,
  ResearchFilterBox,
  ResearchFilterField,
  ResearchIcon,
} from "../../styles/styledComponents/contentList/ListFilters.sc";
import { setResearchArticle } from "../../store/actions/contentListActions";
import searchIcon from "../../styles/assets/icons/search.svg";

const ListFilters = ({ filterLang, setFilterLang }) => {
  const dispatch = useDispatch();
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
          onChange={(e) => dispatch(setResearchArticle(e.target))}
          placeholder="search article"
        />
        <ResearchIcon src={searchIcon} />
      </ResearchFilterBox>
    </FilteringBox>
  );
};

ListFilters.propTypes = {
  filterLang: PropTypes.string.isRequired,
  setFilterLang: PropTypes.func.isRequired,
};

export default ListFilters;
