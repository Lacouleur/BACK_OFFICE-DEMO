/* eslint-disable import/prefer-default-export */
export function getTitleAndSplit(
  homeImgUuid,
  setHomeImgTitle,
  setIsHomeImage,
  navImgUuid,
  setNavImgTitle,
  setIsNavImage,
  transperentImgUuid,
  setFeatImgTitle,
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

  if (transperentImgUuid) {
    setFeatImgTitle(navImgUuid.split("/")[1]);
    setIsTransparentImage(true);
  }

  if (socialImgUuid) {
    setSocialImgTitle(navImgUuid.split("/")[1]);
    setIsSocialImage(true);
  }
}
