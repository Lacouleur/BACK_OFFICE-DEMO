import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import trashIcon from "../../styles/assets/icons/trash.svg";
import greyTrashIcon from "../../styles/assets/icons/trash-grey.svg";
import copy from "../../styles/assets/icons/copy.svg";
import penVioletIcon from "../../styles/assets/icons/pen-circle-violet.svg";
import {
  Tooltip,
  TooltipText,
} from "../../styles/styledComponents/contentList/Content.sc";
import Status from "../ContentList/Status";
import buildDate from "../../helper/buildDate";
import {
  setIsOpenArchiveModal,
  setIsOpenDuplicateModal,
} from "../../store/actions/actionBarActions";

const PageCard = ({
  state,
  title,
  id,
  updatedAt,
  publishedAt,
  modified,
  language,
  publishScheduledAt,
  publishScheduleFailed,
  retryAt,
  failCount,
}) => {
  const history = useHistory();
  const updateDate = buildDate(new Date(updatedAt));
  const dispatch = useDispatch();

  return (
    <PageCardContainer id="pages" key={id}>
      <CardIconActionBox>
        {/* <CardIconAction
          src={eyeIcon}
          onClick={() => console.log("it should link to preview")}
        /> */}
        {state !== "PUBLISHED" ? (
          <CardArchiveBox role="button">
            <CardIconAction
              src={trashIcon}
              onClick={() =>
                dispatch(
                  setIsOpenArchiveModal({
                    value: true,
                    id,
                  })
                  // eslint-disable-next-line prettier/prettier
                )}
            />
          </CardArchiveBox>
        ) : (
          <CardArchiveBox role="button">
            <CardIconAction src={greyTrashIcon} />
            <Tooltip>
              <TooltipText>A published content cannot be archived</TooltipText>
            </Tooltip>
          </CardArchiveBox>
        )}
        <CardIconAction
          src={copy}
          onClick={() => {
            dispatch(setIsOpenDuplicateModal({ value: true, id, language }));
          }}
        />
        <CardIconAction
          src={penVioletIcon}
          onClick={() => {
            history.push(`/page-editor/${id}`);
          }}
        />
      </CardIconActionBox>

      <CardTitleDateBox id="CardTitleBox">
        <CardTitle>{title}</CardTitle>
        <CardUpdatedDate>{`Last save: ${updateDate} `}</CardUpdatedDate>
      </CardTitleDateBox>
      <CardSatusAndLang>
        <Status
          status={state}
          updatedAt={updatedAt}
          publishedAt={publishedAt}
          modified={modified}
          isCard
          publishScheduledAt={publishScheduledAt}
          publishScheduleFailed={publishScheduleFailed}
          retryAt={retryAt}
          failCount={failCount}
        />
        <CardLang>{language}</CardLang>
      </CardSatusAndLang>
    </PageCardContainer>
  );
};

PageCard.defaultProps = {
  updatedAt: "",
  publishedAt: "",
  publishScheduledAt: "",
  publishScheduleFailed: false,
  retryAt: "",
  failCount: 0,
};

PageCard.propTypes = {
  id: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,
  publishedAt: PropTypes.string,
  modified: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  publishScheduledAt: PropTypes.string,
  publishScheduleFailed: PropTypes.bool,
  retryAt: PropTypes.string,
  failCount: PropTypes.number,
};

export default PageCard;
