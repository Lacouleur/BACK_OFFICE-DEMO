export function getData(
  articleId,
  modulesList,
  manifestoData,
  manifestoId,

  setData,
  isActive
) {
  const storedData = [];
  if (articleId) {
    modulesList.map((module) => {
      if (isActive === "opinions") {
        if (module.type === "opinion" && !module.isReaction && articleId) {
          storedData.push({
            id: module.uuid,
            question: module.question,
            participantsCount: module.participantsCount,
            answers: module.answers,
            showRight: module.showRight,
            isVisible: module.isVisible,
          });
        }
      }
      if (isActive === "reaction") {
        if (module.type === "opinion" && module.isReaction && articleId) {
          storedData.push({
            id: module.uuid,
            question: module.question,
            participantsCount: module.participantsCount,
            answers: module.answers,
            showRight: module.showRight,
            isVisible: module.isVisible,
          });
        }
      }
      return null;
    });
  }

  if (manifestoData.components && manifestoId) {
    manifestoData.components.map((module) => {
      if (module.type === "opinion") {
        storedData.push({
          id: module.uuid,
          question: module.question,
          participantsCount: module.participantsCount,
          answers: module.answers,
          showRight: module.showRight,
          isVisible: module.isVisible,
        });
      }
      return null;
    });
  }
  setData(storedData);
}

export function percentage(partialValue, totalValue) {
  const calc = Math.floor((100 * partialValue) / totalValue);
  if (Number.isNaN(calc)) {
    return "0";
  }
  return calc;
}
