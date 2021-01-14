import React from "react";
import PropTypes from "prop-types";
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

const Content = ({ number, content }) => {
  const even = isEven(number);
  const label = content?.category?.label || "undefined";
  const status = content.state || "offline";

  return (
    <LineContentBox
      styles={{
        backgroundColor: `${even ? colors.darkGrey : colors.mediumGrey}`,
      }}
    >
      <CategoryName>{label}</CategoryName>
      <Title>{content.title}</Title>
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
        <Action>
          Modify
          <IconAction src={pen} />
        </Action>
        <Action>
          Archive
          <IconAction src={trash} />
        </Action>
      </ActionBox>
    </LineContentBox>
  );
};

Content.propTypes = {
  number: PropTypes.number.isRequired,
  content: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    category: PropTypes.PropTypes.shape({
      createdAt: PropTypes.string,
      label: PropTypes.string,
      updatedAt: PropTypes.string,
      url: PropTypes.string,
      _id: PropTypes.string,
    }),
    components: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        image: PropTypes.shape({
          digest: PropTypes.string,
          source: PropTypes.string,
          uuid: PropTypes.string,
          _id: PropTypes.string,
        }),
        text: PropTypes.string,
        type: PropTypes.string,
      })
    ),
    state: PropTypes.string,
    createdAt: PropTypes.string,
    firstPublishedAt: PropTypes.string,
    publishedAt: PropTypes.string,
    updatedAt: PropTypes.string,
    isDraft: PropTypes.bool,
  }).isRequired,
};

export default Content;
