/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',  "^react-router-dom$": "<rootDir>/node_modules/react-router-dom",
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(lucide-react|recharts)/)', "/node_modules/(?!(react-router-dom)/)",
  ],
  testMatch: ['**/__tests__/**/*.js', '**/*.test.jsx', '**/*.test.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};