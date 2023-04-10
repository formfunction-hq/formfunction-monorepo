/// <reference types="react-scripts" />

declare module "babel-plugin-relay/macro" {
  // eslint-disable-next-line no-restricted-exports
  export { graphql as default } from "react-relay";
}
