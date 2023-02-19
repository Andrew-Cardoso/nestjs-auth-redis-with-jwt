import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @Min(1)
  @IsNumber()
  password: number;
}
