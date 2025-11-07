module.exports = {
  root: true,
  extends: [
    '@react-native',                 // RN base rules
    'plugin:@typescript-eslint/recommended',
    'prettier'                       // turn off formatting rules that conflict with Prettier
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: undefined               // keep simple; if you use project refs later, point to tsconfig.json
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // tighten gradually as you like:
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  },
  ignorePatterns: ['node_modules/', 'dist/', 'android/', 'ios/'],
};
