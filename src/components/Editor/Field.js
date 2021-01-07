import React from "react";
import PropTypes from "prop-types";
import {
  FieldStyle,
  FieldError,
  ErrorIcon,
} from "../../styles/styledComponents/global/Field.sc";
import Flex from "../../styles/styledComponents/global/FlexBoxes.sc";
import colors from "../../styles/core/colors";
import exclamationIcon from "../../styles/assets/icons/exclamationGrey.svg";

const Field = ({
  boxStyle = {},
  fieldStyle = {},
  properties = { type: "text", placeholder: "" },
  maxlength = "",
  infos = undefined,
}) => {
  return (
    <Flex
      style={{
        ...boxStyle,
        width: "50%",
        flexDirection: "column",
        marginBottom: "30px",
      }}
    >
      <FieldStyle
        type={properties.type}
        placeholder={properties.placeholder}
        maxLength={maxlength}
        style={{
          ...{ fieldStyle },
          height: "56px",
          color: `${colors.white}`,
        }}
      />
      {infos && (
        <Flex
          style={{
            marginTop: "8px",
          }}
        >
          <ErrorIcon src={exclamationIcon} />
          <FieldError>{infos}</FieldError>
        </Flex>
      )}
    </Flex>
  );
};

Field.defaultProps = {
  boxStyle: {},
  fieldStyle: {},
  properties: { type: "text", placeholder: "" },
  maxlength: "",
  infos: undefined,
};

Field.propTypes = {
  boxStyle: PropTypes.shape({}),
  fieldStyle: PropTypes.shape({}),
  properties: PropTypes.shape({
    type: PropTypes.string,
    placeholder: PropTypes.string,
  }),
  maxlength: PropTypes.string,
  infos: PropTypes.string,
};

export default Field;
