/** @type {import('jest').Config} */
export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
export const moduleNameMapper = {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy', "^react-router-dom$": "<rootDir>/node_modules/react-router-dom",
};
export const transform = {
  '^.+\\.(js|jsx)$': 'babel-jest'
};
export const transformIgnorePatterns = [
  '/node_modules/(?!(lucide-react|recharts)/)', "/node_modules/(?!(react-router-dom)/)",
];
export const testMatch = ['**/__tests__/**/*.js', '**/*.test.jsx', '**/*.test.js'];
export const moduleFileExtensions = ['js', 'jsx', 'json', 'node'];