import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  CategoryName,
  Title,
  Status,
  Action,
  IconAction,
  StatusText,
  LineContentBox,
  StatusBox,
  ActionBox,
} from "../../styles/styledComponents/contentList/Content.sc";
import isEven from "../../helper/isEven";
import colors from "../../styles/core/colors";
import pen from "../../styles/assets/icons/pen.svg";
import trash from "../../styles/assets/icons/trash.svg";
import { deleteContent } from "../../services/client/contentClient";

const Content = ({ number, id, status, categoryLabel, title }) => {
  const even = isEven(number);
  return (
    <LineContentBox
      styles={{
        backgroundColor: `${even ? colors.darkGrey : colors.mediumGrey}`,
      }}
    >
      <CategoryName>{categoryLabel}</CategoryName>
      <Title>{title}</Title>
      <StatusBox>
        <Status
          styles={
            status !== "PUBLISHED"
              ? {
                  border: `solid 2px ${colors.transpGrey}`,
                  color: `${colors.white}`,
                  background: `${colors.darkGrey}`,
                  shadow: "none",
                }
              : {}
          }
        >
          <StatusText>{status}</StatusText>
        </Status>
      </StatusBox>
      <ActionBox>
        <Link
          to={{
            pathname: "/editor",
            state: { id },
          }}
        >
          <Action>
            Modify
            <IconAction src={pen} />
          </Action>
        </Link>
        <Action onClick={() => deleteContent(id)}>
          Archive
          <IconAction src={trash} />
        </Action>
      </ActionBox>
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
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Content;
