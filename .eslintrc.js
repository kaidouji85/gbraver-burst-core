module.exports = {
  parser: "@babel/eslint-parser",
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:flowtype/recommended"
  ],
  plugins: [
    "flowtype",
    "jest"
  ]
};