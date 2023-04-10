module.exports = {
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:typescript-sort-keys/recommended",
    "airbnb",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: ["tsconfig.json"],
  },
  plugins: [
    "@typescript-eslint",
    "sort-keys-fix",
    "typescript-sort-keys",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/array-type": ["error", { default: "generic" }],
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],

    camelcase: "off",

    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    // Incompatible with sort-imports
    "import/order": "off",

    "no-nested-ternary": "off",
    "no-shadow": "off",
    "no-undef": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",

    "prettier/prettier": "error",
    "sort-keys-fix/sort-keys-fix": "error",
  },
};
