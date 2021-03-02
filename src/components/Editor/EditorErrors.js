import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import keyGenerator from "../../helper/keyGenerator";
import Error from "../Notifications/Error";
import { setPosted } from "../../store/actions/commonsActions";

const EditorErrors = () => {
  const homeScreenState = useSelector(
    ({ homeScreenReducer }) => homeScreenReducer
  );
  const dispatch = useDispatch();
  const {
    postingError,
    titleError,
    slugError,
    isPosted,
    regexSlugError,
  } = homeScreenState;

  useEffect(() => {
    if (isPosted) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        dispatch(setPosted(false));
      }, 3000);
    }
  }, [isPosted]);

  return (
    <>
      {postingError && (
        <Error
          key={keyGenerator()}
          text="Slug already exist"
          styles={{ width: "90%" }}
        />
      )}
      {isPosted && (
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
          text={`Content need a ${regexSlugError ? "valid " : ""} slug URL.`}
          styles={{ width: "90%" }}
        />
      )}
    </>
  );
};

export default EditorErrors;
