import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateWordDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  text: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  meaning: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsUrl()
  audioUrl?: string;
}

export class UpdateWordDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  text?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  meaning?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsUrl()
  audioUrl?: string;
}
