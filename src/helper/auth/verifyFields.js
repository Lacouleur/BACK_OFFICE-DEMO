export function verifySlug(value) {
  const slugRegex = new RegExp(/^[a-z0-9-]+(?:[a-z0-9]+)*$/);
  const isSlug = slugRegex.exec(value);
  if (isSlug) {
    return true;
  }
  return false;
}

export function verifyField(type, value) {
  if (type === "mail") {
    if (value.length < 8) {
      return false;
    }

    const mailRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/g
    );

    const isMail = mailRegex.exec(value);

    if (isMail) {
      return false;
    }
    return true;
  }

  if (type === "password" && value.length > 4) {
    return false;
  }
  return true;
}

export default verifyField;
