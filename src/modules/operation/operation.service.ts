import { Injectable } from '@nestjs/common';
import { Operation, ApiOperations } from './interfaces/operation';

@Injectable()
export class OperationService {
  async availableOperations(): Promise<ReadonlyArray<Operation>> {
    return ApiOperations;
  }

  sum(n1: number, n2: number): number {
    return n1 + n2;
  }

  subtract(n1: number, n2: number): number {
    return n1 - n2;
  }

  multiply(n1: number, n2: number): number {
    return n1 * n2;
  }

  divide(n1: number, n2: number): number {
    return n1 / n2;
  }

  power(n1: number, n2: number): number {
    return n1 ** n2;
  }

  fibonacci(n: bigint): bigint {
    if (n <= BigInt(1)) return n;
    return this.fibonacci(n - BigInt(1)) + this.fibonacci(n - BigInt(2));
  }

  factorial(n: bigint): bigint {
    if (n <= 1) return BigInt(1);
    return n * this.factorial(n - BigInt(1));
  }

  isPrime(n: number) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i = i + 6)
      if (n % i === 0 || n % (i + 2) === 0) return false;

    return true;
  }
}
