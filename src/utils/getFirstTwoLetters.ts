export const getFirstTwoLetters = (name = '') => {
  const splittedName = name.split(' ');
  return `${splittedName[0][0]}${splittedName[1] ? splittedName[1][0] : splittedName[0][1]}`;
};
