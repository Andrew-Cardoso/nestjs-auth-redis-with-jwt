import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PremiumAccessGuard } from '../auth/guards/premium-access.guard';
import { PremiumAccess } from '../auth/interfaces/premium-access.enum';
import { OneNumberDto } from './dtos/one-number-dto';
import { TwoNumbersDto } from './dtos/two-numbers-dto';
import { OperationRouteEnum } from './interfaces/operation';
import { OperationService } from './operation.service';

@UseGuards(AuthGuard('jwt'))
@Controller('operations')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Get()
  async operation() {
    return await this.operationService.availableOperations();
  }

  @Get(OperationRouteEnum.SUM)
  sum(@Query() { n1, n2 }: TwoNumbersDto) {
    return this.operationService.sum(n1, n2);
  }

  @Get(OperationRouteEnum.SUBTRACT)
  subtract(@Query() { n1, n2 }: TwoNumbersDto) {
    return this.operationService.subtract(n1, n2);
  }

  @Get(OperationRouteEnum.MULTIPLY)
  multiply(@Query() { n1, n2 }: TwoNumbersDto) {
    return this.operationService.multiply(n1, n2);
  }

  @Get(OperationRouteEnum.DIVIDE)
  divide(@Query() { n1, n2 }: TwoNumbersDto) {
    return this.operationService.divide(n1, n2);
  }

  @Get(OperationRouteEnum.POWER)
  power(@Query() { n1, n2 }: TwoNumbersDto) {
    return this.operationService.power(n1, n2);
  }

  @UseGuards(PremiumAccessGuard(PremiumAccess.FIBONACCI))
  @Get(OperationRouteEnum.FIBONACCI)
  fibonacci(@Query() { n }: OneNumberDto) {
    return this.operationService.fibonacci(BigInt(n));
  }

  @UseGuards(PremiumAccessGuard(PremiumAccess.IS_PRIME))
  @Get(OperationRouteEnum.IS_PRIME)
  isPrime(@Query() { n }: OneNumberDto) {
    return this.operationService.isPrime(n);
  }

  @UseGuards(PremiumAccessGuard(PremiumAccess.FACTORIAL))
  @Get(OperationRouteEnum.FACTORIAL)
  factorial(@Query() { n }: OneNumberDto) {
    return this.operationService.factorial(BigInt(n));
  }
}
