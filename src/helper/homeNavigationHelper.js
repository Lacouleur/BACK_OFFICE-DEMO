/* eslint-disable import/prefer-default-export */
export function getTitleAndSplit(
  homeImgUuid,
  setHomeImgTitle,
  setIsHomeImage,
  navImgUuid,
  setNavImgTitle,
  setIsNavImage
) {
  if (homeImgUuid) {
    setHomeImgTitle(homeImgUuid.split("/")[1]);
    setIsHomeImage(true);
  }

  if (navImgUuid) {
    setNavImgTitle(navImgUuid.split("/")[1]);
    setIsNavImage(true);
  }
}
