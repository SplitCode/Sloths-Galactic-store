module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'react-app',
    'prettier',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'coverage'],
  parser: '@typescript-eslint/parser',
  rules: {
    'import/no-default-export': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/consistent-type-imports': [2, { fixStyle: 'separate-type-imports' }],
    '@typescript-eslint/no-restricted-imports': [
      2,
      {
        paths: [
          {
            name: 'react-redux',
            importNames: ['useSelector', 'useStore', 'useDispatch'],
            message: 'Please use pre-typed versions from `src/app/hooks.ts` instead.'
          }
        ]
      }
    ]
  },

  overrides: [{ files: ['*.{c,m,}{t,j}s', '*.{t,j}sx'] }, { files: ['*{test,spec}.{t,j}s?(x)'] }],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname
  },

  settings: {
    react: {
      version: 'detect'
    }
  }
};
