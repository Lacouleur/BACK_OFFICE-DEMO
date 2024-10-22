import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
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
import eyeIcon from "../../styles/assets/icons/eye-circle-green.svg";
import { openPreview } from "../../helper/fieldsHelper";
import { watchOpinionModules } from "../../helper/actionBarHelper";
import statIconGreen from "../../styles/assets/icons/opinion-green.svg";
import statIconGrey from "../../styles/assets/icons/opinion-grey.svg";

const PageCard = ({
  state,
  title,
  id,
  updatedAt,
  publishedAt,
  modified,
  publishScheduledAt,
  publishScheduleFailed,
  retryAt,
  failCount,
  lang,
  slug,
  modulesList,
}) => {
  const history = useHistory();
  const updateDate = buildDate(new Date(updatedAt));
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [isOpinionModules, setIsOpinionModules] = useState(false);

  useEffect(() => {
    setIsOpinionModules(watchOpinionModules(modulesList));
  }, [modulesList.length]);

  return (
    <PageCardContainer id="pages" key={id}>
      <CardIconActionBox>
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
          src={eyeIcon}
          onClick={() => openPreview(lang, slug, "pages")}
        />
        {!isOpinionModules ? (
          <CardIconAction src={statIconGrey} />
        ) : (
          <Link to={{ pathname: `/page-results/${id}` }}>
            <CardIconAction src={statIconGreen} />
          </Link>
        )}
        <CardIconAction
          src={copy}
          onClick={() => {
            dispatch(setIsOpenDuplicateModal({ value: true, id, lang }));
          }}
        />
        <CardIconAction
          src={penVioletIcon}
          onClick={() => {
            history.push(`/page-editor/${id}`);
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </CardIconActionBox>
      <Link
        to={{
          pathname: `/page-editor/${id}`,
        }}
      >
        <CardTitleDateBox hover={hover} id="CardTitleBox">
          <CardTitle>{title}</CardTitle>
          <CardUpdatedDate>{`Last save: ${updateDate} `}</CardUpdatedDate>
        </CardTitleDateBox>
        <CardSatusAndLang
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
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
          <CardLang>{lang}</CardLang>
        </CardSatusAndLang>
      </Link>
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
  publishScheduledAt: PropTypes.string,
  publishScheduleFailed: PropTypes.bool,
  retryAt: PropTypes.string,
  failCount: PropTypes.number,
  lang: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  modulesList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default PageCard;
