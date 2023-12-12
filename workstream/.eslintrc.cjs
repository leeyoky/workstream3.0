module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react/prop-types': 'off',
    /* jsx 파일에 react import 경고 줄 무시 */
    'react/react-in-jsx-scope': 'off',
    /* quotes: [2, 'single'], */
    /* 'no-duplicate-imports': 'error', */
    /* 'no-console': ['warn', { allow: [''warn', 'error', 'info'] }], */
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // 작은따옴표
        semi: true, // 문장의 끝에 세미콜론 추가
        tabWidth: 2, // tab 문자의 길이 지정
        trailingComma: 'all', // 객체나 배열의 마지막 항목에 쉼표 추가
        printWidth: 100, // 한 줄 최대 길이 지정
        bracketSpacing: true, // 갹체 리터럴이나 배열 리터럴에서 중괄호 안에 공백을 추가할지
        endOfLine: 'auto', // 줄 바꿈 문자를 어떤 형식으로 사용할지
        arrowParens: 'avoid', // 화살표 함수의 매개변수가 하나일 경우 괄호를 사용할지 여부
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
