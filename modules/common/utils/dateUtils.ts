export const isTimestamp = (timestamp) =>
  Number(timestamp) ? new Date(Number(timestamp)).getTime() > 10000000 : false;
