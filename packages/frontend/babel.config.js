module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
    ["relay", { artifactDirectory: "./src/__generated__" }],
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
    ["@babel/plugin-transform-react-jsx", { pragma: "h" }],
  ],
};
