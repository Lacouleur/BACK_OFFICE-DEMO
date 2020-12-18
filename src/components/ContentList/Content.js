import React from "react";
import PropTypes from "prop-types";
import Flex from "../../styles/styledComponents/global/FlexBoxes.sc";
import {
  CategoryName,
  Title,
  Status,
  Action,
  IconAction,
  StatusText,
} from "../../styles/styledComponents/contentList/Content.sc";
import isEven from "../../helper/isEven";
import colors from "../../styles/core/colors";
import pen from "../../styles/assets/icons/pen.svg";
import trash from "../../styles/assets/icons/trash.svg";
import { contentList } from "../../styles/styledComponents/global/customs/CustomFlexBoxes.sc";

const Content = ({ number, content }) => {
  const even = isEven(number);

  return (
    <Flex
      style={{
        ...contentList.lineContentBox,
        backgroundColor: `${even ? colors.darkGrey : colors.mediumGrey}`,
      }}
    >
      <CategoryName>{content.category.label}</CategoryName>
      <Title>{content.title}</Title>
      <Flex
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexGrow: "1",
          maxWidth: "5%",
          minWidth: "125px",
        }}
      >
        <Status
          style={
            content.state !== "PUBLISHED"
              ? {
                  border: `solid 2px ${colors.transpGrey}`,
                  color: `${colors.white}`,
                  background: `${colors.darkGrey}`,
                  shadow: "none",
                }
              : {}
          }
        >
          <StatusText>{content.state}</StatusText>
        </Status>
      </Flex>
      <Flex
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "10%",
          minWidth: "205px",
          marginRight: "20px",
        }}
      >
        <Action>
          Modify
          <IconAction src={pen} />
        </Action>
        <Action>
          Archive
          <IconAction src={trash} />
        </Action>
      </Flex>
    </Flex>
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
