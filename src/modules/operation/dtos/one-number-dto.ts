import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class OneNumberDto {
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  n: number;
}
