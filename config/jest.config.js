module.exports = {
  rootDir: '../',
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],

  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    "((^(?:(?!icon\.svg$).)*\.svg$)|.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$)": "jest-file",
    "\.(.icon.svg)$": "jest-svg-sprite-loader"
  },

  testPathIgnorePatterns: [
    '<rootDir>/config/'
  ],

  snapshotSerializers: [
    require.resolve('snapshot-diff/serializer.js'),
  ],

  setupFiles: ['<rootDir>/config/jest/setup'],

  testURL: 'http://localhost/'
}
