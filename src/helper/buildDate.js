function buildDate(date) {
  const options1 = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  const options2 = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return `${date.toLocaleDateString(
    navigator.language,
    options1
  )} - ${date.toLocaleTimeString(navigator.language, options2)}`;
}

export default buildDate;
