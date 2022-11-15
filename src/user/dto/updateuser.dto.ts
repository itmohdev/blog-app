import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  role?: string;

  @IsOptional()
  status?: boolean;
}
