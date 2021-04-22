import React from "react";
import PropTypes from "prop-types";
import {
  LastSavedText,
  StatusBox,
  StatusIcon,
  StatusText,
  Tooltip,
  TooltipText,
} from "../../styles/styledComponents/contentList/Content.sc";
import pendingIcon from "../../styles/assets/icons/pending-changes.svg";
import checkIcon from "../../styles/assets/icons/check-circle-green.svg";
import editPenIcon from "../../styles/assets/icons/edit-pen.svg";
import buildDate from "../../helper/buildDate";

const Status = ({ status, updatedAt, publishedAt, modified }) => {
  const updateDate = buildDate(new Date(updatedAt));
  const publishedDate = buildDate(new Date(publishedAt));

  return (
    <StatusBox>
      {status === "DRAFT" && (
        <>
          <StatusIcon src={editPenIcon} />
          <StatusText unpublished>Draft</StatusText>
          <LastSavedText unpublished>offline</LastSavedText>
        </>
      )}

      {status === "UNPUBLISHED" && (
        <>
          {modified && (
            <Tooltip>
              <TooltipText>modified</TooltipText>
              <TooltipText>{`${updateDate}`}</TooltipText>
            </Tooltip>
          )}
          <StatusIcon src={editPenIcon} />
          <StatusText unpublished>Unpublished</StatusText>
          <LastSavedText unpublished>
            {modified ? "offline - modified" : "offline"}
          </LastSavedText>
        </>
      )}

      {status === "PUBLISHED" && (
        <>
          {modified && (
            <Tooltip>
              <TooltipText>modified</TooltipText>
              <TooltipText>{`${updateDate}`}</TooltipText>
            </Tooltip>
          )}
          <StatusIcon src={modified ? pendingIcon : checkIcon} />
          <StatusText published>Published</StatusText>
          <LastSavedText published>{`${publishedDate}`}</LastSavedText>
        </>
      )}
    </StatusBox>
  );
};

Status.defaultProps = {
  publishedAt: undefined,
};

Status.propTypes = {
  updatedAt: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  publishedAt: PropTypes.string,
  modified: PropTypes.bool.isRequired,
};

export default Status;
