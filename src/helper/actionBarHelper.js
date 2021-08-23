/* eslint-disable array-callback-return */
/* eslint-disable import/prefer-default-export */
export function watchOpinionModules(modulesList) {
  const opinionModules = [];
  modulesList.map((module) => {
    if (module.type === "opinion") {
      opinionModules.push(module);
    }
  });

  if (opinionModules.length > 0) {
    return true;
  }
  return false;
}
