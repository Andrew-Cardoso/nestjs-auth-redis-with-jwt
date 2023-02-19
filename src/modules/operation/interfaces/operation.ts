export enum OperationRouteEnum {
  SUM = 'sum',
  SUBTRACT = 'subtract',
  MULTIPLY = 'multiply',
  DIVIDE = 'divide',
  POWER = 'power',
  FIBONACCI = 'fibonacci',
  FACTORIAL = 'factorial',
  IS_PRIME = 'is-prime',
}

export interface Operation {
  name: string;
  route: OperationRouteEnum;
  description: string;
  params: {
    type: 'query' | 'body';
    accepts: { [key: string]: 'number' | 'string' | 'boolean' };
  };
  free: boolean;
  cost?: number;
}

export const ApiOperations: ReadonlyArray<Operation> = Object.freeze([
  {
    name: 'sum',
    route: OperationRouteEnum.SUM,
    description: 'Returns the sum of two numbers',
    params: { type: 'query', accepts: { n1: 'number', n2: 'number' } },
    free: true,
  },
  {
    name: 'subtract',
    route: OperationRouteEnum.SUBTRACT,
    description: 'Returns the difference of two numbers',
    params: { type: 'query', accepts: { n1: 'number', n2: 'number' } },
    free: true,
  },
  {
    name: 'multiply',
    route: OperationRouteEnum.MULTIPLY,
    description: 'Returns the product of two numbers',
    params: { type: 'query', accepts: { n1: 'number', n2: 'number' } },
    free: true,
  },
  {
    name: 'divide',
    route: OperationRouteEnum.DIVIDE,
    description: 'Returns the quotient of two numbers',
    params: { type: 'query', accepts: { n1: 'number', n2: 'number' } },
    free: true,
  },
  {
    name: 'power',
    route: OperationRouteEnum.POWER,
    description: 'Returns the power of two numbers',
    params: { type: 'query', accepts: { n1: 'number', n2: 'number' } },
    free: true,
  },
  {
    name: 'fibonacci',
    route: OperationRouteEnum.FIBONACCI,
    description: 'Returns the nth number in the Fibonacci sequence',
    free: false,
    params: { type: 'query', accepts: { n: 'number' } },
    cost: 1,
  },
  {
    name: 'factorial',
    route: OperationRouteEnum.FACTORIAL,
    description: 'Returns the factorial of a number',
    free: false,
    params: { type: 'query', accepts: { n: 'number' } },
    cost: 1,
  },
  {
    name: 'is prime',
    route: OperationRouteEnum.IS_PRIME,
    description: 'Returns true if a number is prime',
    free: false,
    params: { type: 'query', accepts: { n: 'number' } },
    cost: 1,
  },
]);
