module.exports = {
  presets: [['@babel/env', {
    targets: {
      ie: '11',
      edge: '17',
      safari: '11.1',
      firefox: '50',
      chrome: '64'
    }
  }]]
}