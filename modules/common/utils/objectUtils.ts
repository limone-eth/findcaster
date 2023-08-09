export const pick = (object, keys) => {
  if (!object) {
    return object;
  }

  const result = {};

  keys.forEach((key) => {
    result[key] = object[key];
  });

  return result;
};

export const isObject = (variable) => typeof variable === 'object' && variable !== null;
