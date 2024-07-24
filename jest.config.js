export default {
  // explain this
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleFileExtensions: ["tsx"],
  transform: {
    "^.+\\.(tsx)$": "babel-jest",
  },
};
