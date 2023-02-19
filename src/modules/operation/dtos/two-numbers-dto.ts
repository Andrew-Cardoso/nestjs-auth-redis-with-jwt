import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class TwoNumbersDto {
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  n1: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  n2: number;
}
