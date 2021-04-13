import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
} from "../../styles/styledComponents/contentList/Content.sc";
import isEven from "../../helper/isEven";
import colors from "../../styles/core/colors";
import trash from "../../styles/assets/icons/trash.svg";
import eye from "../../styles/assets/icons/eye.svg";
import copy from "../../styles/assets/icons/copy.svg";
import pen from "../../styles/assets/icons/pen.svg";
import buildDate from "../../helper/buildDate";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";
import Status from "./Status";

const Content = ({
  number,
  id,
  categoryLabel,
  title,
  lang,
  status,
  updatedAt,
  publishScheduledAt,
  publishedAt,
  modified,
}) => {
  const even = isEven(number);
  const updateDate = buildDate(new Date(updatedAt));
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
        <IconAction src={eye} />
        <IconAction src={trash} />
        <IconAction src={copy} />
      </IconActionBox>
      <Link
        to={{
          pathname: "/editor",
          state: { id },
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
};

export default Content;
