import numeral from 'numeral';

export const formatNumber = (number: number) => (number > 1000 ? numeral(number).format('0.0a') : number);
