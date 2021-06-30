import React from "react";
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
import darkTrashIcon from "../../styles/assets/icons/trash-dark.svg";
import eye from "../../styles/assets/icons/eye.svg";
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
  publishedAt,
  modified,
}) => {
  const even = isEven(number);
  const updateDate = buildDate(new Date(updatedAt));
  const dispatch = useDispatch();

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
        <UpdatedDate>{updateDate}</UpdatedDate>
      </TitleDateBox>
      <Status
        status={status}
        updatedAt={updatedAt}
        publishScheduledAt={publishScheduledAt}
        publishedAt={publishedAt}
        modified={modified}
      />

      <IconActionBox>
        <IconAction
          src={eye}
          onClick={() => {
            let language = lang.slice(0, 2);
            if (language === "ge") {
              language = "de";
            }
            window.open(
              `${PREVIEW_URL}/${language.slice(0, 2)}/content/${slug}`,
              "_blank"
            );
          }}
        />
        {status !== "PUBLISHED" ? (
          <ArchiveBox role="button">
            <ActionIcon
              src={trashIcon}
              onClick={() => dispatch(setIsOpenArchiveModal(true))}
            />
          </ArchiveBox>
        ) : (
          <ArchiveBox role="button">
            <ActionIcon src={even ? greyTrashIcon : darkTrashIcon} />
            <Tooltip>
              <TooltipText>A published content cannot be archived</TooltipText>
            </Tooltip>
          </ArchiveBox>
        )}
        <IconAction src={copy} />
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
};

Content.propTypes = {
  number: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  categoryLabel: PropTypes.string,
  title: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  publishScheduledAt: PropTypes.string,
  publishedAt: PropTypes.string,
  modified: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Content;
