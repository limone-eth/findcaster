const NODE_ENVIRONMENT_DEVELOPMENT = 'development';

// We use DEV environment locally and on Vercel deployments from branch dev
// https://vercel.com/docs/concepts/projects/environment-variables
export const isDevEnv =
  process.env.NODE_ENV === NODE_ENVIRONMENT_DEVELOPMENT || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === 'dev';
