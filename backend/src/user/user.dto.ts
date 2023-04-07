import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3)
  @Transform(({ value }) => value.trim())
  firstName: string;

  @IsNotEmpty()
  @MinLength(3)
  @Transform(({ value }) => value.trim())
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  password: string;
}
