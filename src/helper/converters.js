/* eslint-disable import/prefer-default-export */
export function checkForStringtoArray(toCheck, wantedType) {
  if (typeof toCheck === "string" && wantedType === "array") {
    const toArray = toCheck.split(",");
    return toArray;
  }

  if (typeof toCheck === "object" && wantedType === "string") {
    const toString = toCheck.join(",");
    return toString;
  }

  return toCheck;
}
