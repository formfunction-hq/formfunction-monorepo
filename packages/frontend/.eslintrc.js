module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:relay/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:typescript-sort-keys/recommended",
    "airbnb",
    "prettier",
  ],
  globals: {
    JSX: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: ["tsconfig.json"],
    sourceType: "module",
  },
  plugins: [
    "react",
    "relay",
    "@typescript-eslint",
    "sort-keys-fix",
    "typescript-sort-keys",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/array-type": ["error", { default: "generic" }],
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    camelcase: "off",
    "func-names": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/order": "off",
    "jsx-a11y/alt-text": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/media-has-caption": "off",
    "no-nested-ternary": "off",
    "no-plusplus": "off",
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    "prettier/prettier": "error",
    "react-hooks/rules-of-hooks": "error",
    "react/destructuring-assignment": "off",
    "react/function-component-definition": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/no-unknown-property": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "relay/generated-flow-types": "off",
    "relay/must-colocate-fragment-spreads": "off",
    "relay/no-future-added-value": "off",
    "sort-keys-fix/sort-keys-fix": "error",
  },
};
