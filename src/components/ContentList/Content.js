import React from "react";
import PropTypes from "prop-types";
import Flex from "../../styles/styledComponents/global/flexBoxes";
import {
  CategoryName,
  Title,
  Status,
  Action,
  IconAction,
} from "../../styles/styledComponents/contentList/content";
import isEven from "../../helper/isEven";
import colors from "../../styles/core/colors";
import pen from "../../styles/assets/icons/pen.svg";
import trash from "../../styles/assets/icons/trash.svg";
import { contentList } from "../../styles/styledComponents/global/customs/customFlexBoxes";

const Content = ({ number, content }) => {
  const even = isEven(number);
  const isDraft = content.isDraft ? "Unactive" : "Active";

  return (
    <Flex
      style={{
        ...contentList.LineContentBox,
        backgroundColor: `${even ? colors.darkGrey : colors.mediumGrey}`,
      }}
    >
      <CategoryName>{content.category}</CategoryName>
      <Title>{content.title}</Title>
      <Status
        style={
          isDraft === "Unactive"
            ? {
                border: `solid 2px ${colors.transpGrey}`,
                color: `${colors.white}`,
                background: `${colors.darkGrey}`,
                shadow: "none",
              }
            : {}
        }
      >
        {isDraft}
      </Status>

      <Action>
        Modify
        <IconAction src={pen} />
      </Action>
      <Action>
        Archive
        <IconAction src={trash} />
      </Action>
    </Flex>
  );
};

Content.propTypes = {
  number: PropTypes.number.isRequired,
  content: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    category: PropTypes.string,
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
    status: PropTypes.string,
    createdAt: PropTypes.string,
    firstPublishedAt: PropTypes.string,
    publishedAt: PropTypes.string,
    updatedAt: PropTypes.string,
    isDraft: PropTypes.bool,
  }).isRequired,
};

export default Content;
