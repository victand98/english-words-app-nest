import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateWordDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
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
  text?: string;

  @IsOptional()
  @IsString()
  meaning?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsUrl()
  audioUrl?: string;
}
