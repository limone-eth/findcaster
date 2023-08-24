import mixpanel from 'mixpanel-browser';

const isDevEnv = process.env.NODE_ENV === 'development';

export const EVENT_SEARCH_STARTED = 'searchStarted';

export function trackEvent(eventName: string, data = {}): any {
  if (isDevEnv) {
    return;
  }

  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
    debug: false,
    track_pageview: true,
    persistence: 'localStorage',
    // api_host: `https://100.builders/mp`,
  });

  mixpanel.track(eventName, data);
}
