// eslint-disable-next-line import/prefer-default-export
export function setActivePage(
  currentPage,
  setIsActiveContent,
  setIsActiveProfile,
  setIsActivePageHub
) {
  switch (currentPage) {
    case "/dashboard": {
      setIsActiveContent(true);
      return null;
    }
    case "/profile": {
      setIsActiveProfile(true);
      return null;
    }
    case "/pages": {
      setIsActivePageHub(true);
      return null;
    }
    default:
      return null;
  }
}
