export interface MatchingCastInterface {
  hash: string;
  text: string;
}

export interface MatchingPoapInterface {
  id: string;
  name: string;
}
export const parseMatchingCasts = (matchingCasts: string): MatchingCastInterface[] =>
  matchingCasts
    .split('<>')
    .map((cast) => cast.split('||'))
    .map(([hash, text]) => ({ hash, text }));

export const parseMatchingPoaps = (matchingPoaps: string): MatchingPoapInterface[] =>
  matchingPoaps
    .split('<>')
    .map((poap) => poap.split('||'))
    .map(([id, name]) => ({ id, name }));
