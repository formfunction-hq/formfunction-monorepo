declare module "graphql-validation-complexity" {
  import type { ASTNode, GraphQLError, ValidationContext } from "graphql";

  export interface ComplexityLimitRuleOptions {
    createError?: (cost: number, node: ASTNode) => GraphQLError;
    formatErrorMessage?: (cost: number) => string;
    introspectionListFactor?: number;

    listFactor?: number;
    objectCost?: number;
    onCost?: (cost: number, context: ValidationContext) => void;
    scalarCost?: number;
  }

  export function createComplexityLimitRule(
    maxCost: number,
    options?: ComplexityLimitRuleOptions
  ): (ctx: ValidationContext) => any;
}
