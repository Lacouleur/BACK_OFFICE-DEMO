import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  CardHandleIcon,
  CardHeaderContainer,
  CardTitleBox,
  CollectionCardContainer,
  Delete,
  FieldAndSwitchContainer,
  CardTitle,
  RoundThumbnailPlaceholder,
} from "../../../../../../styles/styledComponents/editor/modules/Modules.sc";
import Field from "../../../../Field";
import {
  RoundThumbnail,
  Thumbnail,
} from "../../../../../../styles/styledComponents/editor/Sections.sc";
import { ImageFieldBox } from "../../../../../../styles/styledComponents/global/Field.sc";
import SwitchButton from "../../../../../Tools/Switch";
import {
  deleteCollectionCard,
  setCollectionCurrentOpenedCard,
  setCollectionCardLinkIsNewTab,
} from "../../../../../../store/actions/moduleActions";
import trashIcon from "../../../../../../styles/assets/icons/trash.svg";
import handleIcon from "../../../../../../styles/assets/icons/handle-violet.svg";

const CollectionCardImage = ({
  cardOrder,
  cardId,
  moduleId,
  cardImageThumbnail,
  cardImageUuid,
  altCardImage,
  cardLinkTo,
  cardLinkOpenNewTab,
  cardCtaLabel,
  currentOpennedCard,
  description,
}) => {
  const dispatch = useDispatch();
  const [imageTitle, setImageTitle] = useState(undefined);
  const [isImage, setIsImage] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const collectionCardRef = useRef(null);

  useEffect(() => {
    if (cardImageUuid) {
      // eslint-disable-next-line react/prop-types
      setImageTitle(cardImageUuid.split("/")[1]);
      setIsImage(true);
    }
  }, [cardImageUuid]);

  useEffect(() => {
    if (isOpen) {
      dispatch(setCollectionCurrentOpenedCard({ moduleId, cardId }));
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentOpennedCard !== cardId) {
      setIsOpen(false);
    }
  }, [currentOpennedCard]);

  return (
    <CollectionCardContainer
      isOpen={isOpen}
      ref={collectionCardRef}
      onClick={() => setIsOpen(true)}
      isHand={currentOpennedCard}
      isFirst={cardOrder === 1}
    >
      <CardHeaderContainer>
        <CardTitleBox>
          {!isOpen && (
            <>
              <CardHandleIcon src={handleIcon} />
              {cardImageUuid && (
                <RoundThumbnail foldedCollectionCard src={cardImageThumbnail} />
              )}
              {!cardImageUuid && <RoundThumbnailPlaceholder />}
            </>
          )}

          <CardTitle>{`${cardOrder}. IMAGE`}</CardTitle>
        </CardTitleBox>

        <Delete
          src={trashIcon}
          onClick={() => {
            dispatch(deleteCollectionCard({ moduleId, cardId }));
          }}
        />
      </CardHeaderContainer>
      {isOpen && currentOpennedCard === cardId && (
        <>
          {/* IMAGE FIELD & THUMBNAIL */}
          <ImageFieldBox>
            <Field
              placeholder="Navigation Image"
              name="collectionCardImage"
              displayName="Card Image"
              section="collectionCard"
              fieldType="uploader"
              edit={imageTitle}
              infos="Image size: 320x456 / 320x320 / 320x180 - 500ko maximum"
              moduleId={moduleId}
              subId={cardId}
            />
            {cardImageThumbnail && imageTitle && (
              <Thumbnail ctaPageImage src={cardImageThumbnail} />
            )}
          </ImageFieldBox>

          {/* ALT FIELD FOR IMAGE  */}
          {isImage && (
            <>
              <Field
                placeholder="Alternative text card image"
                name="collectionCardAltImage"
                displayName="Alt Card Image"
                infos="Maximum 120 characters"
                maxlength="120"
                section="collection"
                edit={altCardImage || undefined}
                moduleId={moduleId}
                subId={cardId}
              />
            </>
          )}

          <>
            <Field
              placeholder="Description"
              name="collectionCardDescription"
              displayName="Card Description"
              infos="Maximum 350 characters"
              maxlength="350"
              section="collection"
              edit={description || undefined}
              moduleId={moduleId}
              subId={cardId}
            />
          </>

          {/* LINK FIELD & SWITCH */}
          <FieldAndSwitchContainer>
            <Field
              placeholder="Link to"
              name="collectionCardLinkTo"
              displayName="Cta Link"
              section="collection"
              moduleId={moduleId}
              subId={cardId}
              edit={cardLinkTo || ""}
            />

            <SwitchButton
              action={() =>
                dispatch(
                  setCollectionCardLinkIsNewTab({
                    moduleId,
                    cardId,
                    value: !cardLinkOpenNewTab,
                  })
                )}
              isChecked={cardLinkOpenNewTab}
              componentId={`collection-card-link-${moduleId}-${cardId}`}
              displayedText="Open in new window"
            />
          </FieldAndSwitchContainer>

          {/* LINK LABEL */}
          <Field
            placeholder="Link to"
            name="collectionCardCtaLabel"
            displayName="Cta Label"
            section="collection"
            moduleId={moduleId}
            subId={cardId}
            edit={cardCtaLabel || ""}
          />
        </>
      )}
    </CollectionCardContainer>
  );
};

CollectionCardImage.defaultProps = {
  cardImageThumbnail: undefined,
  cardImageUuid: undefined,
  altCardImage: undefined,
  cardLinkTo: undefined,
  cardLinkOpenNewTab: false,
  cardCtaLabel: undefined,
  currentOpennedCard: "",
  description: undefined,
};

CollectionCardImage.propTypes = {
  cardOrder: PropTypes.number.isRequired,
  cardId: PropTypes.string.isRequired,
  moduleId: PropTypes.string.isRequired,
  cardImageThumbnail: PropTypes.string,
  cardImageUuid: PropTypes.string,
  altCardImage: PropTypes.string,
  cardLinkTo: PropTypes.string,
  cardLinkOpenNewTab: PropTypes.bool,
  cardCtaLabel: PropTypes.string,
  currentOpennedCard: PropTypes.string,
  description: PropTypes.string,
};

export default CollectionCardImage;
