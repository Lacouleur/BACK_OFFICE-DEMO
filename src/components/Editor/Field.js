/* eslint-disable react/jsx-curly-newline */
import React from "react";
import PropTypes, { func } from "prop-types";
import {
  FieldStyle,
  FieldError,
  ErrorIcon,
} from "../../styles/styledComponents/global/Field.sc";
import Flex from "../../styles/styledComponents/global/FlexBoxes.sc";
import colors from "../../styles/core/colors";
import exclamationIcon from "../../styles/assets/icons/exclamationGrey.svg";
import exclamationVioletIcon from "../../styles/assets/icons/exclamation.svg";

const Field = ({
  boxStyle = {},
  fieldStyle = {},
  properties = { type: "text", placeholder: "" },
  maxlength = "",
  infos = undefined,
  setter,
  values,
  name,
  error,
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
        onChange={(e) =>
          setter({
            ...values,
            [name]: e.target.value,
          })
        }
        style={{
          ...fieldStyle,
          color: `${error ? colors.paleViolet : colors.white}`,
          border: `${error ? `2px solid ${colors.paleViolet}` : `none`}`,
          height: "56px",
        }}
      />
      {infos && (
        <Flex
          style={{
            marginTop: "8px",
          }}
        >
          <ErrorIcon src={error ? exclamationVioletIcon : exclamationIcon} />
          <FieldError
            style={{ color: `${error ? colors.paleViolet : colors.white}` }}
          >
            {infos}
          </FieldError>
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
  error: undefined,
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
  setter: func.isRequired,
  values: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.bool,
};

export default Field;
