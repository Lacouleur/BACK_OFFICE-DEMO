import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  CategoryName,
  Title,
  StatusIcon,
  IconAction,
  StatusText,
  LineContentBox,
  StatusBox,
  Lang,
  TitleDateBox,
  UpdatedDate,
  LastSavedText,
  IconActionBox,
  ButtonIcon,
  Tooltip,
  TooltipText,
} from "../../styles/styledComponents/contentList/Content.sc";
import isEven from "../../helper/isEven";
import colors from "../../styles/core/colors";
import trash from "../../styles/assets/icons/trash.svg";
import clock from "../../styles/assets/icons/clock.svg";
import eye from "../../styles/assets/icons/eye.svg";
import copy from "../../styles/assets/icons/copy.svg";
import pen from "../../styles/assets/icons/pen.svg";
import buildDate from "../../helper/buildDate";
import Button from "../../styles/styledComponents/global/Buttons/Buttons.sc";

const Content = ({ number, id, categoryLabel, title, lang, updatedAt }) => {
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
      <StatusBox>
        <Tooltip>
          <TooltipText>Published</TooltipText>
          <TooltipText>02/22/11</TooltipText>
        </Tooltip>
        <StatusIcon src={clock} />
        <StatusText>Will Be Published</StatusText>
        <LastSavedText>{`${updateDate}`}</LastSavedText>
      </StatusBox>
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
};

Content.propTypes = {
  number: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  categoryLabel: PropTypes.string,
  title: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export default Content;
