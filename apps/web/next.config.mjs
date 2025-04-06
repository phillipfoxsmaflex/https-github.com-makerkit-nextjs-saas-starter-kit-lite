const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ENABLE_REACT_COMPILER = process.env.ENABLE_REACT_COMPILER === 'true';

const INTERNAL_PACKAGES = [
  '@kit/ui',
  '@kit/auth',
  '@kit/accounts',
  '@kit/shared',
  '@kit/supabase',
  '@kit/i18n',
  '@kit/next',
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: INTERNAL_PACKAGES,
  output: 'standalone',
  images: {
    remotePatterns: getRemotePatterns(),
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    mdxRs: true,
    reactCompiler: ENABLE_REACT_COMPILER,
    turbo: {
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    optimizePackageImports: [
      'recharts',
      'lucide-react',
      '@radix-ui/react-icons',
      '@radix-ui/react-avatar',
      '@radix-ui/react-select',
      'date-fns',
      ...INTERNAL_PACKAGES,
    ],
  },
  eslint: { ignoreDuringBuilds: IS_PRODUCTION },
  typescript: { ignoreBuildErrors: IS_PRODUCTION },
};

export default config;

function getRemotePatterns() {
  /** @type {import('next').NextConfig['remotePatterns']} */
  const remotePatterns = [];

  if (SUPABASE_URL) {
    const hostname = new URL(SUPABASE_URL).hostname;
    remotePatterns.push({
      protocol: 'https',
      hostname,
    });
  }

  return IS_PRODUCTION
    ? remotePatterns
    : [
        {
          protocol: 'http',
          hostname: '0.0.0.0',
        },
      ];
}