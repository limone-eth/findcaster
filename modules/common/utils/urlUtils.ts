export const sanitizeUrl = (url) => {
  try {
    const sanitizedUrl = new URL(url);

    const VALID_PROTOCOLS = ['http:', 'https:'];

    if (!VALID_PROTOCOLS.includes(sanitizedUrl.protocol)) {
      return ''; // it's an invalid URL!
    }

    return sanitizedUrl;
  } catch (error) {
    // append https to url
    if (!url.includes('http')) {
      return `https://${url}`;
    }
  }
};

/**
 *
 * @param resolvedUrl e.g. /onboarding = true or /posts/onboarding = false
 * @returns {boolean}
 */
export const isOnboardingUrl = (resolvedUrl) => {
  if (!resolvedUrl) {
    return false;
  }

  const parts = resolvedUrl.split('/');
  return parts?.[3]?.includes('onboarding');
};
