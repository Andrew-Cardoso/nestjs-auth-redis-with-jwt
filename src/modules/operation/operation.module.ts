import { Module } from '@nestjs/common';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';

@Module({
  imports: [],
  controllers: [OperationController],
  providers: [OperationService],
  exports: [],
})
export class OperationModule {}
