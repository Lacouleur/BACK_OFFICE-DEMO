import React, { useEffect } from "react";
import PropTypes from "prop-types";
import keyGenerator from "../../helper/keyGenerator";
import Error from "../Notifications/Error";

const EditorErrors = ({
  postingError,
  specialError,
  posted,
  setPosted,
  titleError,
  slugError,
}) => {
  useEffect(() => {
    if (posted) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        setPosted(false);
      }, 3000);
    }
  }, [posted]);

  return (
    <>
      {postingError.isError && (
        <Error
          key={keyGenerator()}
          text={postingError.text}
          styles={{ width: "90%" }}
        />
      )}
      {posted && (
        <Error
          key={keyGenerator()}
          text="The content has been saved"
          styles={{ width: "90%" }}
          type="valid"
        />
      )}
      {titleError && (
        <Error
          key={keyGenerator()}
          text="Content need a title."
          styles={{ width: "90%" }}
        />
      )}
      {slugError && (
        <Error
          key={keyGenerator()}
          text={`Content need a ${specialError ? "valid " : ""} slug URL.`}
          styles={{ width: "90%" }}
        />
      )}
    </>
  );
};

EditorErrors.propTypes = {
  postingError: PropTypes.shape({
    isError: PropTypes.bool,
    text: PropTypes.string,
  }).isRequired,
  specialError: PropTypes.bool.isRequired,
  posted: PropTypes.bool.isRequired,
  setPosted: PropTypes.func.isRequired,
  titleError: PropTypes.bool.isRequired,
  slugError: PropTypes.bool.isRequired,
};

export default EditorErrors;