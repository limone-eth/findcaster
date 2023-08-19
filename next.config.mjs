const { withPlausibleProxy } = require('next-plausible')

const nextConfig = {
  experimental: {
    appDir: true,
  },
};


export default withPlausibleProxy()(nextConfig);
