export function checkSlug(values) {
  if (!values.slug) {
    return true;
  }
  return false;
}

export function checkTitle(values) {
  if (!values.title) {
    return true;
  }
  return false;
}
