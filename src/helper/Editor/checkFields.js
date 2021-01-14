function checkFields(values) {
  const arr = [];

  if (!values.title) {
    arr.push("title");
  }
  if (!values.slug) {
    arr.push("slug URL");
  }
  return arr;
}

export default checkFields;
