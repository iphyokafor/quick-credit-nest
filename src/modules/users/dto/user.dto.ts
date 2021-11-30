import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly address: string;

  @ApiPropertyOptional()
  readonly status: string;

  @ApiPropertyOptional()
  readonly isAdmin: string;
}
