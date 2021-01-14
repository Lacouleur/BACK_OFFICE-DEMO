export function verifySlug(value) {
  const slugRegex = new RegExp(/^[a-z0-9-]+(?:[a-z0-9]+)*$/);
  const isSlug = slugRegex.exec(value);
  if (isSlug) {
    return true;
  }
  return false;
}

export function verifyField(id, value, setter) {
  if (id === "ID") {
    if (value.length < 8) {
      setter("");
      return;
    }

    const mailRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/g
    );

    const isMail = mailRegex.exec(value);

    if (isMail) {
      setter(value);
      return;
    }
    setter("unvalid");
    return;
  }

  if (id === "password" && value.length > 4) {
    setter(value);
    return;
  }
  setter("");
}

export default verifyField;
