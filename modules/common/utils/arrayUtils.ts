export const printArrayString = (arrayOfStrings) => {
  if (arrayOfStrings.length === 1) {
    return arrayOfStrings[0];
  }

  return `${arrayOfStrings.slice(0, -1).join(', ')} and ${arrayOfStrings.slice(-1)}`;
};

export const arrayUnique = (array) => array.filter((element, index, _array) => index === _array.indexOf(element));

export const chunk = (array, size) => {
  const chunkedArray: any[] = [];

  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }

  return chunkedArray;
};

/**
 * Function to sort alphabetically an array of objects by some specific key.
 * https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
 *
 * @param {String} property Key of the object to sort.
 * @param {String} order Sort oder (asc or desc).
 */
export const dynamicSort =
  (property, order = 'asc') =>
  (itemA, itemB) => {
    if (order === 'desc') {
      return itemB[property].localeCompare(itemA[property]);
    }

    return itemA[property].localeCompare(itemB[property]);
  };
