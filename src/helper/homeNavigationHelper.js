/* eslint-disable import/prefer-default-export */
export function getTitleAndSplit(
  homeImgUuid,
  setHomeImgTitle,
  setIsHomeImage,
  navImgUuid,
  setNavImgTitle,
  setIsNavImage,
  transparentImgUuid,
  setTransparentImgTitle,
  setIsTransparentImage,
  socialImgUuid,
  setSocialImgTitle,
  setIsSocialImage
) {
  if (homeImgUuid) {
    setHomeImgTitle(homeImgUuid.split("/")[1]);
    setIsHomeImage(true);
  }

  if (navImgUuid) {
    setNavImgTitle(navImgUuid.split("/")[1]);
    setIsNavImage(true);
  }

  if (transparentImgUuid) {
    setTransparentImgTitle(transparentImgUuid.split("/")[1]);
    setIsTransparentImage(true);
  }

  if (socialImgUuid) {
    setSocialImgTitle(socialImgUuid.split("/")[1]);
    setIsSocialImage(true);
  }
}
