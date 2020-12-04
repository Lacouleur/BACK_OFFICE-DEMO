const verifyField = (id, value, setter) => {
  if (id === "ID") {
    if (value.length === 0) {
      setter("");
      return;
    }

    const mailRegex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/g
    );

    const isMail = mailRegex.exec(value);

    if (isMail) {
      setter("valid");
      return;
    }

    if (!isMail) {
      setter("unvalid");
      return;
    }
  }

  if (id === "pwd" && value.length > 6) {
    setter("valid");
    return;
  }
  setter("false");
};

export default verifyField;
