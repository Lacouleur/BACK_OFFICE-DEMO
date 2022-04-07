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
import warningIcon from "../../styles/assets/icons/warning-red.svg";
import clockIcon from "../../styles/assets/icons/clock.svg";
import buildDate from "../../helper/buildDate";
import retryIcon from "../../styles/assets/icons/retry-orange.svg";

const Status = ({
  status,
  updatedAt,
  publishedAt,
  modified,
  publishScheduledAt,
  publishScheduleFailed,
  retryAt,
  failCount,
  isCard,
}) => {
  const updateDate = buildDate(new Date(updatedAt));
  const publishedDate = buildDate(new Date(publishedAt));
  const scheduledDate = buildDate(new Date(publishScheduledAt));
  const retryDate = buildDate(new Date(retryAt));

  return (
    <StatusBox isCard={isCard}>
      {publishScheduledAt && !publishScheduleFailed && (
        <>
          {publishedAt && (
            <Tooltip>
              <TooltipText>Last time published :</TooltipText>
              <TooltipText>{`${publishedDate}`}</TooltipText>
            </Tooltip>
          )}
          {!publishedAt && (
            <Tooltip>
              <TooltipText>
                It will be published for the first time :)
              </TooltipText>
            </Tooltip>
          )}
          <StatusIcon src={clockIcon} />
          <StatusText unpublished>Will be published</StatusText>
          <LastSavedText unpublished>{scheduledDate}</LastSavedText>
        </>
      )}

      {status === "DRAFT" && !publishScheduledAt && !publishScheduleFailed && (
        <>
          <StatusIcon src={editPenIcon} />
          <StatusText unpublished>Draft</StatusText>
          <LastSavedText unpublished>offline</LastSavedText>
        </>
      )}

      {publishScheduleFailed && (
        <>
          {retryAt && (
            <>
              <StatusIcon src={retryIcon} />
              <StatusText unpublished>Publish error</StatusText>
              <LastSavedText unpublished>retrying...</LastSavedText>

              <Tooltip>
                <TooltipText>
                  {`We'll retry to publish it at : ${retryDate} `}
                </TooltipText>
                <TooltipText>{`Fail count: ${failCount}`}</TooltipText>
              </Tooltip>
            </>
          )}
          {!retryAt && (
            <>
              <StatusIcon src={warningIcon} />
              <StatusText unpublished>Publish error</StatusText>
              <LastSavedText unpublished>
                offline - Publication fail
              </LastSavedText>

              <Tooltip>
                <TooltipText>
                  We tryed to publish it many times but it didn&apos;t work :/
                </TooltipText>
              </Tooltip>
            </>
          )}
        </>
      )}

      {status === "UNPUBLISHED" &&
        !publishScheduledAt &&
        !publishScheduleFailed && (
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

      {status === "PUBLISHED" && !publishScheduledAt && !publishScheduleFailed && (
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
  publishScheduledAt: undefined,
  publishScheduleFailed: undefined,
  retryAt: null,
  failCount: null,
  isCard: false,
  updatedAt: undefined,
};

Status.propTypes = {
  updatedAt: PropTypes.string,
  status: PropTypes.string.isRequired,
  publishedAt: PropTypes.string,
  modified: PropTypes.bool.isRequired,
  publishScheduledAt: PropTypes.string,
  publishScheduleFailed: PropTypes.bool,
  retryAt: PropTypes.string,
  failCount: PropTypes.number,
  isCard: PropTypes.bool,
};

export default Status;
