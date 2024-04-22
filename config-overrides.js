module.exports = function override(config, env) {
  console.log('config-overrides', config)
  let loaders = config.resolve
  loaders.fallback = {
    path: false, //require.resolve('path-browserify'),
    crypto: false, //require.resolve('crypto-browserify'),
    os: false, //require.resolve('os-browserify/browser'),
    buffer: false, //require.resolve('buffer/'),
    stream: false, //require.resolve('stream-browserify'),
    vm: false, //require.resolve("vm-browserify")
  }
  return config
}
