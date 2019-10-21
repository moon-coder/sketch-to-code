module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots:["./src/"],
  testMatch:[ "**/__tests__/**/*\.test\.ts?(x)" ]
};