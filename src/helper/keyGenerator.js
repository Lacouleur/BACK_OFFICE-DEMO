const keyGenerator = (name) => {
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

  const key = `${Date.now()}
  ${getRandomInt(10000, 99999)}
  ${getRandomInt(10000, 99999)}
  ${name}`;
  return key;
};

export default keyGenerator;
