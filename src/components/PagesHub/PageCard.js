import React from "react";
import PropTypes from "prop-types";
import {
  CardArchiveBox,
  CardIconAction,
  CardIconActionBox,
  CardLang,
  CardSatusAndLang,
  CardTitle,
  CardTitleDateBox,
  CardUpdatedDate,
  PageCardContainer,
} from "../../styles/styledComponents/pagesHub/PagesHub.sc";
import eyeIcon from "../../styles/assets/icons/eye-circle-green.svg";
import greyTrashIcon from "../../styles/assets/icons/trash-grey.svg";
import copy from "../../styles/assets/icons/copy.svg";
import penVioletIcon from "../../styles/assets/icons/pen-circle-violet.svg";
import {
  Tooltip,
  TooltipText,
} from "../../styles/styledComponents/contentList/Content.sc";
import Status from "../ContentList/Status";

const PageCard = ({
  state,
  title,
  id,
  updatedAt,
  publishedAt,
  modified,
  language,
}) => {
  return (
    <PageCardContainer id="pages" key={id}>
      <CardIconActionBox>
        <CardIconAction
          src={eyeIcon}
          onClick={() => console.log("it should link to preview")}
        />
        <CardArchiveBox role="button">
          <CardIconAction src={greyTrashIcon} />
          <Tooltip>
            <TooltipText>Building :)</TooltipText>
          </Tooltip>
        </CardArchiveBox>
        <CardIconAction
          src={copy}
          onClick={() => {
            console.log("it will open duplicate modal");
            /* dispatch(setIsOpenDuplicateModal({ value: true, id, lang })); */
          }}
        />
        <CardIconAction
          src={penVioletIcon}
          onClick={() => {
            console.log("it will open page Editor");
          }}
        />
      </CardIconActionBox>

      <CardTitleDateBox id="CardTitleBox">
        <CardTitle>{title}</CardTitle>
        <CardUpdatedDate>{`Last save: `}</CardUpdatedDate>
      </CardTitleDateBox>
      <CardSatusAndLang>
        <Status
          status={state}
          updatedAt={updatedAt}
          publishedAt={publishedAt}
          modified={modified}
          isCard
        />
        <CardLang>{language}</CardLang>
      </CardSatusAndLang>
    </PageCardContainer>
  );
};

PageCard.defaultProps = {
  id: undefined,
};

PageCard.propTypes = {
  id: PropTypes.string,
};

export default PageCard;
