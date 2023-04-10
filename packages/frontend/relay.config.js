module.exports = {
  customScalars: {
    PaginationAmount: "number",
    PublicKey: "string",
    bigint: "number",
    timestamptz: "string",
    uuid: "string",
  },
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
  language: "typescript",
  schema: "./schema.graphql",
  src: "./src",
};
