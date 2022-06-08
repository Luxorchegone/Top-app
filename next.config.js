module.exports = {
  images: {
    domains: ['courses-top.ru', 'cdn-bucket.hb.bizmrg.com']
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
