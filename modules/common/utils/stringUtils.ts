export const truncateString = (string, length, separator) => {
  if (string.length <= length) return string;

  separator = separator || '…';

  const sepLen = separator.length;
  const charsToShow = length - sepLen;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return string.substring(0, frontChars) + separator + string.substring(string.length - backChars);
};

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const shortenString = (string, length) =>
  string.length > length ? `${string.slice(0, length - 1)}...` : string;

export const isString = (string) => typeof string === 'string' || string instanceof String;
