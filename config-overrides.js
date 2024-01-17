module.exports = function override(config, env) {
  console.log('config-overrides')
  let loaders = config.resolve
  loaders.fallback = {
    path: require.resolve('path-browserify'),
    crypto: require.resolve('crypto-browserify'),
    os: require.resolve('os-browserify/browser'),
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify'),
  }
  return config
}
