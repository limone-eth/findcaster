import { withPlausibleProxy } from 'next-plausible'

const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },
};


export default withPlausibleProxy()(nextConfig);
