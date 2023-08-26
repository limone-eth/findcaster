export function getRootUrl(): string {
  return 'http://localhost:3000';
}

export const createUrl = (url, params = []): string => {
  if (params && params.length > 0) {
    return `${url}?${params.join('&')}`;
  }

  return url;
};

export const getWarpcastUrl = (username: string): string => `https://warpcast.com/${username}`;
export const getWarpcastCastUrl = (username: string, castHash): string =>
  `https://warpcast.com/${username}/${castHash}`;
export const getPoapEventUrl = (eventId: string): string => `https://poap.gallery/event/${eventId}`;

export const getGithubUrl = () => 'https://github.com/limone-eth/findcaster';
