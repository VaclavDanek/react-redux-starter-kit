/* eslint-disable no-undef */

module.exports = {
  rootDir: "src",
  verbose: true,
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  moduleNameMapper:{
    "\\.(css|less|scss|sass)$": "identity-obj-proxy" 
  },
  testEnvironment: "jsdom"
}