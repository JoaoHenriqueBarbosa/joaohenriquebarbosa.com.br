module.exports = {
  images: {
    domains: ['d3t3ozftmdmh3i.cloudfront.net'],
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  }
}