import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CategoryName,
  Title,
  IconAction,
  LineContentBox,
  Lang,
  TitleDateBox,
  UpdatedDate,
  IconActionBox,
  ButtonIcon,
  Tooltip,
  TooltipText,
} from "../../styles/styledComponents/contentList/Content.sc";
import isEven from "../../helper/isEven";
import colors from "../../styles/core/colors";
import trashIcon from "../../styles/assets/icons/trash.svg";
import greyTrashIcon from "../../styles/assets/icons/trash-grey.svg";
import eye from "../../styles/assets/icons/eye-circle-green.svg";
import copy from "../../styles/assets/icons/copy.svg";
import pen from "../../styles/assets/icons/pen.svg";
import buildDate from "../../helper/buildDate";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import Status from "./Status";
import {
  ActionIcon,
  ArchiveBox,
} from "../../styles/styledComponents/editor/ActionBar.sc";
import { setIsOpenArchiveModal } from "../../store/actions/actionBarActions";
import { watchOpinionModules } from "../../helper/actionBarHelper";
import statIconGreen from "../../styles/assets/icons/opinion-green.svg";
import statIconGrey from "../../styles/assets/icons/opinion-grey.svg";
import { setIsOpenDuplicateModal } from "../../store/actions/contentListActions";

function harmonizeLang(lang, slug) {
  let language = lang.slice(0, 2);
  if (language === "ge") {
    language = "de";
  }
  window.open(
    `${PREVIEW_URL}/${language.slice(0, 2)}/content/${slug}`,
    "_blank"
  );
}

const Content = ({
  number,
  id,
  categoryLabel,
  title,
  slug,
  lang,
  status,
  updatedAt,
  publishScheduledAt,
  publishScheduleFailed,
  publishedAt,
  modified,
  modulesList,
  retryAt,
  failCount,
}) => {
  const even = isEven(number);
  const updateDate = buildDate(new Date(updatedAt));
  const dispatch = useDispatch();
  const [isOpinionModules, setIsOpinionModules] = useState(false);

  useEffect(() => {
    setIsOpinionModules(watchOpinionModules(modulesList));
  }, [modulesList.length]);

  return (
    <LineContentBox
      styles={{
        backgroundColor: `${even ? colors.darkGrey : colors.mediumGrey}`,
      }}
    >
      <Lang>{lang.substring(0, 2)}</Lang>
      <CategoryName>{categoryLabel}</CategoryName>
      <TitleDateBox>
        <Title>{title}</Title>
        <UpdatedDate>{`Last save: ${updateDate}`}</UpdatedDate>
      </TitleDateBox>
      <Status
        status={status}
        updatedAt={updatedAt}
        publishScheduledAt={publishScheduledAt}
        publishedAt={publishedAt}
        modified={modified}
        publishScheduleFailed={publishScheduleFailed}
        retryAt={retryAt}
        failCount={failCount}
      />

      <IconActionBox>
        <IconAction src={eye} onClick={() => harmonizeLang(lang, slug)} />
        {!isOpinionModules ? (
          <IconAction src={statIconGrey} />
        ) : (
          <Link to={`/opinion-results/${id}`} target="_blank">
            <IconAction src={statIconGreen} />
          </Link>
        )}

        {status !== "PUBLISHED" ? (
          <ArchiveBox role="button">
            <ActionIcon
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
          </ArchiveBox>
        ) : (
          <ArchiveBox role="button">
            <ActionIcon src={greyTrashIcon} />
            <Tooltip>
              <TooltipText>A published content cannot be archived</TooltipText>
            </Tooltip>
          </ArchiveBox>
        )}
        <IconAction
          src={copy}
          onClick={() => {
            dispatch(setIsOpenDuplicateModal({ value: true, id, lang }));
          }}
        />
      </IconActionBox>
      <Link
        to={{
          pathname: `/editor/${id}`,
        }}
      >
        <Button
          styles={{
            background: "transparent",
            fontColor: `${colors.paleViolet}`,
            border: `1px solid ${colors.paleViolet}`,
            fontWeight: "700",
          }}
        >
          Modify
          <ButtonIcon src={pen} />
        </Button>
      </Link>
    </LineContentBox>
  );
};

Content.defaultProps = {
  categoryLabel: "",
  publishScheduledAt: undefined,
  publishedAt: undefined,
  publishScheduleFailed: undefined,
  retryAt: null,
  failCount: null,
};

Content.propTypes = {
  number: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  categoryLabel: PropTypes.string,
  publishScheduleFailed: PropTypes.bool,
  title: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  publishScheduledAt: PropTypes.string,
  publishedAt: PropTypes.string,
  modified: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  modulesList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  retryAt: PropTypes.string,
  failCount: PropTypes.number,
};

export default Content;
