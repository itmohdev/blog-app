import { IsOptional } from 'class-validator';

export class SearchUserDto {
  @IsOptional()
  id?: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  role?: string;

  @IsOptional()
  status?: boolean;
}
