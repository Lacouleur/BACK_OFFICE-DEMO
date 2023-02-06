/* eslint-disable import/prefer-default-export */
export function getTitleAndSplit(
  headerImgUuid,
  setHeaderImgTitle,
  setIsHeaderImage,
  headerLargeImgUuid,
  setHeaderLargeImgTitle,
  setIsHeaderLargeImage
) {
  if (headerImgUuid) {
    setHeaderImgTitle(headerImgUuid.split("/")[1]);
    setIsHeaderImage(true);
  }

  if (headerLargeImgUuid) {
    setHeaderLargeImgTitle(headerLargeImgUuid.split("/")[1]);
    setIsHeaderLargeImage(true);
  }
}
