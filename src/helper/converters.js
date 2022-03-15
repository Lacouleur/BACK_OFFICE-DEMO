/* eslint-disable import/prefer-default-export */
export function checkForStringtoArray(toCheck, wantedType) {
  if (typeof toCheck === "string" && wantedType === "array") {
    let toArray = [];
    toArray = toCheck.split(",");
    return toArray;
  }

  if (typeof toCheck === "object" && wantedType === "string") {
    let toString = [];
    toString = toCheck.join(",");
    return toString;
  }

  return toCheck;
}
