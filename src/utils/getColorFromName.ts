export const getColorFromName = (name = '') => {
  let hash = 0;
  let i;

  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `${value.toString(16)}`;
  }
  if (color.length < 7) {
    color += '66';
  }
  return color;
};
